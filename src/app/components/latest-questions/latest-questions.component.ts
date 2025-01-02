import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuestionService } from '../../services/questionService/question.service';

@Component({
  selector: 'app-latest-questions',
  templateUrl: './latest-questions.component.html',
  styleUrls: ['./latest-questions.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgSelectModule]
})
export class LatestQuestionsComponent implements OnInit {
  originalQuestions: any[] = [];
  questions: any[] = [];
  groupedTechnologies: any[] = [];
  showAllTechnologies = false;
  readonly initialTechCount = 3;
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private questionService: QuestionService) {}

  ngOnInit() {
    // Listen to query parameters for search
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'] || '';

      // Check if we are in the browser environment
      if (typeof window !== 'undefined' && window.history) {
        const state = window.history.state;
        if (state && state.results) {
          // Use results passed via router state
          this.questions = state.results;
          this.isSearchActive = true;
        } else if (this.searchQuery) {
          // Fetch results if query exists but no state is passed
          this.fetchSearchResults(this.searchQuery);
        } else {
          // Load default questions
          this.loadQuestions();
        }
      } else {
        // Handle non-browser environments (e.g., SSR)
        this.loadQuestions();
      }
    });

    // Initialize technologies grouping
    this.groupTechnologies();
  }

  /**
   * Load default questions (hardcoded data).
   */
  private loadQuestions() {
    // Hardcoded default questions
    this.originalQuestions = [
      {
        id: '1',
        title: 'Is there a way to create a formula in Catia via Macro to link parameters?',
        body: 'The main goal is to link between two parameters...',
        votes: 0,
        views: 2,
        tags: ['HTML', 'React'],
        postedBy: 'Alice',
        postedDate: '2024-12-04'
      },
      {
        id: '2',
        title: 'How to implement an HTTP request in Angular?',
        body: 'Can someone explain how to make an HTTP request in Angular?',
        votes: 5,
        views: 10,
        tags: ['Angular', 'HTTP'],
        postedBy: 'Bob',
        postedDate: '2024-12-03'
      },
      {
        id: '3',
        title: 'What are some best practices for REST API design?',
        body: 'I’m looking for recommendations on REST API design...',
        votes: 3,
        views: 7,
        tags: ['API', 'REST'],
        postedBy: 'Charlie',
        postedDate: '2024-12-02'
      }
    ];

    this.questions = [...this.originalQuestions];
    this.isSearchActive = false;
    this.groupTechnologies();
  }

  /**
   * Fetch search results based on a query.
   */
  fetchSearchResults(query: string) {
    // Filtering questions based on query
    this.questions = this.originalQuestions.filter(question =>
      question.title.toLowerCase().includes(query.toLowerCase()) ||
      question.body.toLowerCase().includes(query.toLowerCase()) ||
      question.tags.some((tag: any) => tag.toLowerCase().includes(query.toLowerCase()))
    );
    this.isSearchActive = true;
  }

  /**
   * Fetch technologies and group them based on tags.
   */
  private groupTechnologies() {
    const allTechnologies = this.getTechnologies();
    this.groupedTechnologies = allTechnologies
      .filter(tech => this.getTechCount(tech) > 0)
      .slice(0, this.initialTechCount);
  }

  /**
   * Generate a list of unique technologies from tags.
   */
  getTechnologies(): { id: string; name: string }[] {
    const uniqueTags = new Set<string>();

    this.originalQuestions.forEach((question: any) => {
      question.tags.forEach((tag: string) => uniqueTags.add(tag.toLowerCase()));
    });

    return Array.from(uniqueTags).map(tag => ({
      id: tag,
      name: this.capitalize(tag)
    }));
  }

  /**
   * Capitalize the first letter of a word.
   */
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /**
   * Get the count of questions tagged with a specific technology.
   */
  getTechCount(technology: any): number {
    return this.originalQuestions.filter(question =>
      question.tags.some((tag: any) => tag.toLowerCase() === technology.id.toLowerCase())
    ).length;
  }

  /**
   * Show all technologies when the user requests to expand.
   */
  showMore() {
    this.showAllTechnologies = true;
    this.groupedTechnologies = this.getTechnologies();
  }

  /**
   * Filter questions based on the selected technology.
   */
  filterQuestions(technology: any) {
    if (technology && technology.id) {
      this.questions = this.originalQuestions.filter(question =>
        question.tags.some((tag: any) => tag.toLowerCase() === technology.id.toLowerCase())
      );
    } else {
      this.questions = [...this.originalQuestions];
    }
  }

  /**
   * Determine if the footer should be displayed for more technologies.
   */
  shouldShowFooter(): boolean {
    return !this.showAllTechnologies && this.remainingTechnologiesCount > 0;
  }

  /**
   * Compute the count of remaining technologies not displayed.
   */
  get remainingTechnologiesCount(): number {
    const totalTechnologies = this.getTechnologies().length;
    return totalTechnologies - this.initialTechCount;
  }

  protected readonly formatDate = formatDate;
}
