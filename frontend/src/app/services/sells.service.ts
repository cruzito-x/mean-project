import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellsService {

  constructor() { }

  saveSellsData(sellData: any[]) {
    fetch("http://localhost:3000/sells/save", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sellData)
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error("Error saving the receipt")
      }

      return response.json();
    })
    .then((data: any) => {
      console.log("Sells saved successfully:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
}
