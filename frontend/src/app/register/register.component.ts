import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;

  form: FormGroup;
  loginService = inject(LoginService);
  isLoggedIn = false;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl(''),
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
  }
}