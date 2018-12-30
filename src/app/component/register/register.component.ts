import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

export const validator = (controls: AbstractControl) => {
  const password = controls.get('password').value;
  const confirmPassword = controls.get('confirmPassword').value;
  if (password !== confirmPassword) {
    controls.get('confirmPassword').setErrors({ matchpassword: true });
  } else {
    return null;
  }
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm = () => {
    this.registerForm = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: validator }
    );
  }

  register = () => {
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(
        response => {
          if (response.id) {
            this.router.navigate(['/auth/login']);
          }
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.warn('invalid');
    }
  }
}
