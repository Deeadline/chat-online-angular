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
import { DomSanitizer } from '@angular/platform-browser';

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
    private service: HttpService,
    private sainitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initConnection();
  }

  ngOnDestroy(): void {
    console.log('Hello world');
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
        response.forEach(element => {
          const { item1, item2 } = element;
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
        console.log(room);
        this.selectedRoom = room;
      });
  }

  enterRoom = (roomName: string, userId: number) => {
    if (!this.isSelected) {
      this.signalRService.enterRoom(roomName, userId);
      this.isSelected = true;
    } else {
      this.signalRService.changeRoom(roomName, userId);
    }
  }

  send = (): void => {
    if (!this.messageContent) {
      return;
    }
    this.signalRService.sendMessage(
      new Message().deserialize({
        sender: this.user.name,
        content: this.messageContent
      })
    );
    this.messageContent = null;
  }

  getPhoto = (photo: string) => {
    return this.sainitizer.bypassSecurityTrustResourceUrl(photo);
  }
}
