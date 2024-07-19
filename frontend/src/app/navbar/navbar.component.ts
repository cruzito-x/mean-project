import { Component, inject } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSearch, faUser, faCartShopping, faSignOut, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { CartService } from "../services/cart.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import $ from "jquery";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: "./navbar.component.html",
  styles: ``
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

  logOut() {
    localStorage.clear();
    location.reload();
  }

  constructor() {
    this.form = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }

  async register() {
    const response = await this.loginService.register(this.form.value);
    console.log(response);
  }

  async login() {
    let userEmail = $("#userEmail").val();
    let userPassword = $("#userPassword").val();

    if(userEmail !== "" && userPassword !== "") {
      const response = await this.loginService.login(this.form.value);
      this.isLoggedIn = response.isLoggedIn;
      localStorage.setItem("isLoggedIn", response.isLoggedIn);
      $(".btn-close").click();
    }
  }
}
