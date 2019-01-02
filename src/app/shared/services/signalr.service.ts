import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { User } from 'src/app/model/user.model';
import { Room } from 'src/app/model/room.model';
import { Message } from 'src/app/model/message.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  constructor() {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(`${environment.apiUrl}/chat`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log(`Error while starting connection: ${err}`));
  }

  // za kazdym razem kiedy ktos wysle wiadomosc
  public getMessageListener = (): Observable<Message> => {
    return new Observable<Message>(observer => {
      this.hubConnection.on('BroadcastMessage', (data: Message) =>
        observer.next(data)
      );
    });
  }

  public getRoomListener = (): Observable<Room> => {
    return new Observable<Room>(observer => {
      this.hubConnection.on('Reload', (data: Room) => observer.next(data));
    });
  }

  public sendMessage = (message: Message): void => {
    this.hubConnection.invoke('SendMessage', message);
  }

  public changeRoom = (roomName: string, id: number): void => {
    this.hubConnection.invoke('ChangeRoom', roomName, id);
  }

  public enterRoom = (roomName: string, id: number): void => {
    this.hubConnection.invoke('EnterRoom', roomName, id);
  }
}
