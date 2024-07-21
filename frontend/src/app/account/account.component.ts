import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import Swal from'sweetalert2';
import $ from 'jquery';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  token: string = localStorage.getItem('token') || '';;
  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.getUserByToken(this.token);
  }

  deleteAccount() {
    Swal.fire({
      text: "Are you sure of delete this account?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, I'm sure",
      cancelButtonText: "Go to back"
    }).then((result) => {
      if(result.isConfirmed) {
        this.loginService.deleteAccount(this.token);
      }
    });
  }

  updateAccount(event: Event) {
    event.preventDefault();
    const new_username = $("#new_username").val();
    const new_email = $("#new_user_email").val();
    const new_password = $("#new_user_password").val();
  
    if (new_username !== "" || new_email !== "" || new_password !== "") {
      this.loginService.updateUser(this.token, { username: new_username, email: new_email, password: new_password });
    } else {
      Swal.fire({
        text: "Please fill in at least one field to update your account",
        icon: "error",
        confirmButtonColor: "#007bff",
        confirmButtonText: "Accept"
      });
    }
  }
}
