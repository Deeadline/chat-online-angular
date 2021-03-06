import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/model/user.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post<User>(`api/user/register`, user).pipe(
      map(response => {
        return response;
      })
    );
  }

  login = (user: User): Observable<any> => {
    return this.http.post<any>(`api/user/login`, user).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.setUser(response.token);
        }
      })
    );
  }

  logout = (): void => {
    this.http.get(`api/user/logout?id=${this.getUser().id}`);
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

  upload = (file: File): Observable<any> => {
    if (!file) {
      return;
    }

    const user = this.getUser();
    const input = new FormData();
    input.append(file.name, file);
    return this.http.post<any>(`api/user/upload?userId=${user.id}`, input).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  download = (name: string): Observable<any> => {
    return this.http.get<any>(`api/user/download?photoName=${name}`);
  }
}
