import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public service: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm = () => {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  login = (): void => {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(response => {
        if (response.token) {
          this.router.navigate(['/app/chat']);
        }
      });
    } else {
      console.warn('invalid');
    }
  }

  register = () => {
    this.router.navigate(['/auth/register']);
  }
}
