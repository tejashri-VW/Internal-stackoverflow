import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';  // Import FormsModule

@Component({
  selector: 'app-root',
  standalone: true,  // Standalone component setup
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, FormsModule, NavbarComponent, FooterComponent]  // Add FormsModule here
})
export class AppComponent {
  searchQuery: string = '';  // Variable for binding with input field

  constructor() {}

  onSearch() {
    if (this.searchQuery) {
      console.log('Searching for:', this.searchQuery);  // Handle search logic
    }
  }
}
