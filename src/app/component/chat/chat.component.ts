import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { User } from 'src/app/model/user.model';
import { SignalrService } from 'src/app/shared/services/signalr.service';
import { Message } from 'src/app/model/message.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { Room } from 'src/app/model/room.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
  @ViewChild('scroller', { read: ElementRef }) private scroller: ElementRef;

  selectedRoom: Room = new Room(); // aktualnie wybrany pokoj
  user: User; // current user
  rooms: Room[] = []; // spis pokoi
  messageContent: string; // do wysylki
  messageListener: any; // do pobierania
  roomsListener: any; // do pobierania
  roomListener: any; // do pobierania aktualnego pokoju
  isSelected = false; // do wyswietlania

  constructor(
    private signalRService: SignalrService,
    private service: HttpService
  ) {}

  ngOnInit() {
    this.initConnection();
  }

  ngOnDestroy(): void {
    this.signalRService.leaveRoom(this.user.id);
  }

  ngAfterViewInit(): void {
    this.scroll();
  }

  ngAfterViewChecked(): void {
    setInterval(this.scroll, 10);
  }

  scroll = () => {
    try {
      this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
    } catch (err) {}
  }

  initConnection = (): void => {
    this.user = this.service.getUser();

    this.signalRService.startConnection();

    this.roomsListener = this.signalRService
      .getRoomsListener()
      .subscribe((response: any) => {
        response.forEach(({ item1, item2 }) => {
          this.rooms.push(new Room().deserialize({ id: item1, name: item2 }));
        });
      });

    this.messageListener = this.signalRService
      .getMessageListener()
      .subscribe((message: Message) => {
        this.selectedRoom.messages.push(message);
      });

    this.roomListener = this.signalRService
      .getRoomListener()
      .subscribe((room: Room) => {
        this.selectedRoom = room;
      });
  }

  onSelect = ({ name, id }) => {
    if (!this.isSelected) {
      this.signalRService.enterRoom(name, id);
      this.isSelected = true;
    } else {
      this.signalRService.changeRoom(name, id);
    }
  }

  onSend = (message: string): void => {
    if (!message) {
      return;
    }
    this.signalRService.sendMessage(
      new Message().deserialize({
        sender: this.user.name,
        content: message
      })
    );
  }
}
