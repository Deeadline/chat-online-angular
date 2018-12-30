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
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild('scroller', { read: ElementRef }) private scroller: ElementRef;

  // mock data
  selectedRoom: Room = new Room().deserialize({
    id: 1,
    name: 'FFA',
    users: [
      new User().deserialize({ id: 1, name: 'Romek', avatar: 'test' }),
      new User().deserialize({ id: 2, name: 'Romek1', avatar: 'test1' }),
      new User().deserialize({ id: 3, name: 'Romek2', avatar: 'test2' })
    ],
    messages: [
      new Message().deserialize({ sender: 'Romek', content: 'Test1' }),
      new Message().deserialize({ sender: 'Romek1', content: 'Test12' }),
      new Message().deserialize({ sender: 'Romek2', content: 'Test2' }),
      new Message().deserialize({ sender: 'Romek', content: 'Test3' }),
      new Message().deserialize({ sender: 'Romek2', content: 'Test4' }),
      new Message().deserialize({ sender: 'Romek1', content: 'Test123' }),
      new Message().deserialize({ sender: 'Romek1', content: 'Test123' }),
      new Message().deserialize({ sender: 'Romek1', content: 'Test123' }),
      new Message().deserialize({ sender: 'Romek1', content: 'Test123' }),
      new Message().deserialize({ sender: 'Romek1', content: 'Test123' })
    ]
  });
  rooms: Room[] = [
    new Room().deserialize({ id: 1, name: 'FFA' }),
    new Room().deserialize({ id: 2, name: 'FFA2' }),
    new Room().deserialize({ id: 3, name: 'FFA3' })
  ];

  user: User;
  messageContent: string;
  messageListener: any;
  roomListener: any;

  constructor(
    private signalRService: SignalrService,
    private service: HttpService,
    private imageService: ImageService
  ) {
    this.user = this.service.getUser();
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
        this.rooms.push(room);
      });
    this.messageListener = this.signalRService
      .getMessageListener()
      .subscribe((message: Message) => {
        this.selectedRoom.messages.push(message);
      });
  }

  selectRoom = (roomId: number) => {
    this.service.getRoom(roomId).then(room => {
      this.selectedRoom = room;
    });
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
}
