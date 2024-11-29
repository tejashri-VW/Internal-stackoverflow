import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery: string = '';  // Variable for binding with input field

  constructor() {}

  onSearch() {
    if (this.searchQuery) {
      console.log('Searching for:', this.searchQuery);  // Handle search logic
    }
  }
}
