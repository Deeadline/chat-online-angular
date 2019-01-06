import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(public service: HttpService, private router: Router) {}

  ngOnInit() {}

  onUpload = (input: HTMLInputElement) => {
    const file = input.files[0];
    if (file) {
      this.service.upload(file).subscribe(response => {
        this.router.navigate(['/app/chat/']);
      });
    }
  }
}
