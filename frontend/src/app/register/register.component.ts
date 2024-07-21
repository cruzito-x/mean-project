import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import Swal from "sweetalert2";
import $ from "jquery";

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
  isLoggedIn: any = false;

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      password: new FormControl('')
    });
  }

  async register() {
    const user = $("#userName").val();
    const email = $("#userMail").val();
    const phone = $("#userPhone").val();
    const address = $("#userAddress").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();
    
    if(user !== "" && email !== "" && phone !== "" && address !== "" && password !== "" && confirmPassword !== "") {
      if(password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          text: "Password don't match, please try again",
          confirmButtonColor: "#007bff",
          confirmButtonText: "Accept"
        });
        return;
      } else {
        await this.loginService.register(this.form.value);
        this.isLoggedIn = true;
        
        Swal.fire({
          text: "Account created successfully",
          icon: "success",
          confirmButtonColor: "#007bff",
          confirmButtonText: "Accept"
        }).then(() => {
          this.loginService.login({ email, password });
          location.href = "/";
        });
      } 
    } else {
      Swal.fire({
        icon: "error",
        text: "All fields are required, please fill in all the required fields",
        confirmButtonColor: "#007bff",
        confirmButtonText: "Accept"
      });
    }
  }
}