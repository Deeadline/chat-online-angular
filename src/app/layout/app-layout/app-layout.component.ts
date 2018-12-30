import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { User } from 'src/app/model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
  public currentUser: User;
  constructor(
    public service: HttpService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.currentUser = service.getUser();
  }

  ngOnInit() {}

  logout = () => {
    this.service.logout();
    this.toastrService.success('You have been succesfuly logout');
    this.router.navigate(['/auth/login']);
  }

  profile = () => {
    this.router.navigate([`/app/user/${this.currentUser.id}/edit`]);
  }
}
