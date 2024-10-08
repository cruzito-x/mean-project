import { Component, inject } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSearch, faUser, faCartShopping, faSignOut, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { CartService } from "../services/cart.service";
import { RouterOutlet } from "@angular/router";
import Swal from "sweetalert2";
import $ from "jquery";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: "./navbar.component.html",
  styles: `
  .nav-item, .nav-link {
    cursor: pointer;
  }
  `
})
export class NavbarComponent {
  faSearch = faSearch;
  faUser = faUser;
  faCartShopping = faCartShopping;
  faSignOut = faSignOut;
  faEnvelope = faEnvelope;
  faLock = faLock;

  form: FormGroup;
  loginService = inject(LoginService);
  cartService = inject(CartService);
  isLoggedIn: any = false;

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") || false;
  }

  constructor() {
    this.form = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }

  async login() {
    let userEmail = $("#userEmail").val();
    let userPassword = $("#userPassword").val();

    if(userEmail !== "" && userPassword !== "") {
      const response = await this.loginService.login(this.form.value);

      if(response.status !== 200) {
        Swal.fire({
          text: "Login failed, please try again",
          icon: "error",
          confirmButtonColor: "#007bff",
          confirmButtonText: "Accept"
        });

        return;
      } else {
        this.isLoggedIn = response.isLoggedIn;
        localStorage.setItem("isLoggedIn", this.isLoggedIn);
        localStorage.setItem("token", response.token);

        Swal.fire({
          text: "☆ Welcome to CinnaTech Store! ☆",
          icon: "success",
          confirmButtonColor: "#007bff",
          confirmButtonText: "Accept",
          focusConfirm: true
        }).then(() => {
          $(".btn-close").click();
        });
      }
    } else {
      Swal.fire({
        text: "Please fill all fields",
        icon: "error",
        confirmButtonColor: "#007bff",
        confirmButtonText: "Accept"
      });
    }
}
}
