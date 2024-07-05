import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styles: `
    .card {
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    
    .card img {
      transition: opacity 0.3s ease;
    }
    
    .card .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 1.25rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
        
    .card:hover img {
      opacity: 0.5;
    }

    .card:hover .overlay {
      opacity: 1;
    }
  `
})
export class HomeComponent {}
