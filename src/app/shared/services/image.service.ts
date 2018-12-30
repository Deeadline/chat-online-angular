import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  getImage = (imageUrl: string): Observable<Blob> => {
    return this.httpClient.get(`api/user/download/${imageUrl}`, { responseType: 'blob' });
  }

  saveImage = () => {

  }
}
