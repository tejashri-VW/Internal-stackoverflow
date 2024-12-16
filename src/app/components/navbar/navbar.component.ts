import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {QuestionService} from '../services/question-service/question.service';

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

  constructor(private router: Router, private questionService :QuestionService) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      // Make the API call
      this.questionService.getSearchedData()
        .subscribe(
          (response: any) => {
            // Navigate to the question page with search results
            this.router.navigate(['/latest-questions'], {
              queryParams: { query: this.searchQuery },
              state: { results: response },
            });
          },
          (error) => {
            console.error('Search error:', error);
            this.router.navigate(['/latest-questions'], {
              queryParams: { query: this.searchQuery },
              state: { results: [] },
            });
          }
        );
    }
  }
}


