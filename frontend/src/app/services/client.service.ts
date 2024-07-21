import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private items: any[] = [];

  constructor() { }

  clientInfo(item: any): void {
    this.items.push({ ...item });
    localStorage.setItem('clientInfo', JSON.stringify(item));
  }

  getClientInfo(): any {
    return this.items;
  }
}
