import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/internal/operators';
import { User } from 'src/app/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Room } from 'src/app/model/room.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private tokenKey = 'auth-token';
  private currentUserKey = 'current-user';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.isAuthenticated();
  }

  // sekcja logowania i rejestracji
  register = (user: User): Observable<User> => {
    return this.http.post<User>(`api/user/register`, user, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  login = (user: User): Observable<any> => {
    return this.http.post<any>(`api/user/login`, user, httpOptions).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.setUser(response.token);
        }
      })
    );
  }

  logout = (): void => {
    this.http.get(`api/user/logout?id=${this.getUser().id}`, httpOptions);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
  }

  // sekcja pobierania i zapisywania do localStorage

  setToken = (token: string): void => {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken = (): string => {
    return localStorage.getItem(this.tokenKey);
  }

  setUser = (token: string): void => {
    localStorage.setItem(
      this.currentUserKey,
      JSON.stringify(this.jwtHelper.decodeToken(token))
    );
  }

  getUser = (): User => {
    const ob = JSON.parse(localStorage.getItem(this.currentUserKey));
    const userr = JSON.parse(ob['user']);
    return new User().deserialize(userr);
  }

  isAuthenticated = (): boolean => {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  // Sekcja do pobierania danych z pokoju (aktualni uzytkownicy, stare wiadomosci) - to i tak moze stad zniknąć :D

  getRoom = (roomId: number): Promise<any> => {
    return this.http.get(`api/room/${roomId}`, httpOptions).toPromise();
  }
}
