import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(public service: HttpService) {}

  ngOnInit() {}

  onUpload = (input: HTMLInputElement) => {
    const file = input.files[0];
    if (file) {
      this.service.upload(file).subscribe(response => {
        console.log(response);
      });
    }
  }
}
