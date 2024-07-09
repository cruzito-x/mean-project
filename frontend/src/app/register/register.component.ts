import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faLock = faLock;

  form: FormGroup;
  loginService = inject(LoginService);
  isLoggedIn = false;

  constructor(private _route: ActivatedRoute) {
    const isLloggedIn = this._route.snapshot.queryParamMap.get('isLloggedIn');
    console.log(isLloggedIn);

    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      password: new FormControl('')
    });
  }

  async register() {
    const response = await this.loginService.register(this.form.value);
    console.log(response);
  }

  async login() {
    const response = await this.loginService.login(this.form.value);
    this.isLoggedIn = response.isLoggedIn;
    location.href = '/', this.isLoggedIn;
  }
}