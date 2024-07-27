import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

interface Users {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private host: string;
  public user: Users[] = [];
  private jwtHelper = new JwtHelperService();

  constructor() {
    this.host = 'http://localhost:3000/users';
  }

  register(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(
        `${this.host}/register`, formValue
      )
    );
  }

  async login(formValue: any) {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<any>(
          `${this.host}/login`, formValue
        )
      );
  
      return response;
    } catch (error) {
      return error;
    }
  }

  async getUserByToken(token: string): Promise<any> {
    return fetch(`${this.host}/details`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error getting user details');
      }
      return response.json();
    })
    .then(data => {
      this.user = [data];
      return this.user;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    Swal.fire({
      text: "☆ Thanks for visit CinnaTech Store! ☆",
      icon: "success",
      confirmButtonColor: "#007bff",
      confirmButtonText: "Accept"
    }).then(() => {
      localStorage.clear();
      window.location.href = "/";
    });
  }

  expiredToken() {
    const token: any = localStorage.getItem("token");
    if (this.isTokenExpired(token) && token !== null) {
      this.logOut();
      localStorage.clear();
    }
  }

  async updateUser(token: string, formValue: any) {
    try {
      const response = await fetch(`${this.host}/update/${token}`, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      });
      
      if (!response.ok) {
        throw new Error("Error updating user");
      } else {
        await response.json();
      
        Swal.fire({
          text: "Account updated successfully",
          icon: 'success',
          confirmButtonColor: "#007bff",
          confirmButtonText: "Accept"
        }).then(() => {
          location.reload();
        }); 
      }
    } catch (error) {
      Swal.fire({
        text: "Error updating account, please try again",
        icon: "error",
        confirmButtonColor: "#007bff",
        confirmButtonText: "Accept"
      });
    }
  }

  async deleteAccount(token: string) {
    try {
      const response = await fetch(`${this.host}/delete/${token}`, {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if(!response.ok) {
        throw new Error("Error deleting account");
      } else {
        await response.json();

        Swal.fire({
          text: "Account deleted successfully",
          icon: "success",
          confirmButtonColor: "#007bff",
          confirmButtonText: "Accept"
        }).then(() => {
          localStorage.clear();
          location.href = "/";
        });
      }

    } catch(error) {
      Swal.fire({
        text: "Error deleting account, please try again",
        icon: "error",
        confirmButtonColor: "#007bff",
        confirmButtonText: "Accept"
      });
    }
  }
}
