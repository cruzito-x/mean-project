import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private host: string;

  constructor() {
    this.host = 'http://localhost:3000/users';
  }

  register(formValue: any)  {
    return firstValueFrom(
      this.httpClient.post<any>(
        `${this.host}/register`, formValue
      )
    )
  }

  login(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(
        `${this.host}/login`, formValue
      )
    )
  }
}
