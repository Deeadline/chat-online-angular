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
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { Message } from 'src/app/model/message.model';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Room } from 'src/app/model/room.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
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

  constructor(private socket: SocketService, private service: HttpService) {}

  ngOnInit() {
    this.initConnection();
  }

  ngOnDestroy(): void {
    this.socket.leaveRoom(this.user.id);
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

    this.socket.startConnection();

    this.roomsListener = this.socket
      .getRoomsListener()
      .subscribe((response: any) => {
        response.forEach(({ item1, item2 }) => {
          this.rooms.push(new Room().deserialize({ id: item1, name: item2 }));
        });
      });

    this.messageListener = this.socket
      .getMessageListener()
      .subscribe((message: Message) => {
        this.selectedRoom.messages.push(message);
      });

    this.roomListener = this.socket
      .getRoomListener()
      .subscribe((room: Room) => {
        this.selectedRoom = room;
      });
  }

  onSelect = ({ name, id }) => {
    if (!this.isSelected) {
      this.socket.enterRoom(name, id);
      this.isSelected = true;
    } else {
      this.socket.changeRoom(name, id);
    }
  }

  onSend = (message: string): void => {
    if (!message) {
      return;
    }
    this.socket.sendMessage(
      new Message().deserialize({
        sender: this.user.name,
        content: message
      })
    );
  }
}
