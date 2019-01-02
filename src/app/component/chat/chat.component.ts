import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit
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
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild('scroller', { read: ElementRef }) private scroller: ElementRef;

  selectedRoom: Room = new Room(); // aktualnie wybrany pokoj
  user: User; // current user
  rooms: Room[]; // spis pokoi
  messageContent: string; // do wysylki
  messageListener: any; // do pobierania
  roomListener: any; // do pobierania
  isSelected = false; // do wyswietlania

  constructor(
    private signalRService: SignalrService,
    private service: HttpService
  ) {
    this.user = this.service.getUser();
    this.service.getRooms().then(response => {
      this.rooms = response;
    });
  }

  ngOnInit() {
    this.initConnection();
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
    this.signalRService.startConnection();

    this.roomListener = this.signalRService
      .getRoomListener()
      .subscribe((room: Room) => {
        console.log(room);
      });

    this.messageListener = this.signalRService
      .getMessageListener()
      .subscribe((message: Message) => {
        this.selectedRoom.messages.push(message);
      });
  }

  enterRoom = (roomName: string, userId: number) => {
    if (!this.isSelected) {
      this.signalRService.enterRoom(roomName, userId);
      this.isSelected = true;
    }
    this.signalRService.changeRoom(roomName, userId);
  }

  send = (): void => {
    if (!this.messageContent) {
      return;
    }
    this.signalRService.sendMessage(
      new Message().deserialize({
        sender: this.user,
        content: this.messageContent
      })
    );
    this.messageContent = null;
  }
}
