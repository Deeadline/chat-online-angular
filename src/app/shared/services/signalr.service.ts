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

  // za każdym razem kiedy wejdzie nowy uzytkownik do pokoju
  public getUsersListener = (): Observable<User> => {
    return new Observable<User>(observer => {
      this.hubConnection.on('BroadcastUsers', (data: User) =>
        observer.next(data)
      );
    });
  }

  // za kazdym razem kiedy ktos wysle wiadomosc
  public getMessageListener = (): Observable<Message> => {
    return new Observable<Message>(observer => {
      this.hubConnection.on('BroadcastMessage', (data: Message) =>
        observer.next(data)
      );
    });
  }

  // za kazdym razem gdy stworzy sie nowy pokoj
  public getRoomListener = (): Observable<Room> => {
    return new Observable<Room>(observer => {
      this.hubConnection.on('BroadcastRoom', (data: Room) =>
        observer.next(data)
      );
    });
  }

  public sendMessage = (message: Message): void => {
    this.hubConnection.invoke('SendMessage', message);
  }
}
