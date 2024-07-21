import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
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
    const response = await firstValueFrom(
      this.httpClient.post<any>(
        `${this.host}/login`, formValue
      )
    );

    return response;
  }

  async getUserByToken(token: string) {
    fetch(`${this.host}/details`, {
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
