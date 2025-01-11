import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {CommonModule, formatDate} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuestionService } from '../../services/questionService/question.service';
import {Subscription} from 'rxjs';

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
  groupedTechnologies: { id: string; name: string }[] = [];
  showAllTechnologies = false;
  initialTechCount = 3;
  searchQuery = '';
  isSearchActive = false;
  routeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.isSearchActive = true;
        this.fetchSearchResults(this.searchQuery);
      } else {
        this.isSearchActive = false;
        this.loadQuestions();
      }
    });
  }

  loadQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: (response) => {
        this.originalQuestions = response.content || [];
        this.questions = [...this.originalQuestions];
        this.groupTechnologies();
      },
      error: (error) => {
        console.error('Error loading questions:', error);
      }
    });
  }

  fetchSearchResults(query: string) {
    this.questionService.SearchQuestionByKeyword(query).subscribe({
      next: (response) => {
        this.originalQuestions = response.content || [];
        this.questions = [...this.originalQuestions];
        this.groupTechnologies();
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
  }

  clearQuery() {
    this.router.navigate(['/questions'], { queryParams: {} });
    this.searchQuery = '';
    this.isSearchActive = false;
    this.loadQuestions();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  groupTechnologies() {
    const uniqueTags = new Map<string, string>();
    this.originalQuestions.forEach((question) => {
      question.tags.forEach((tag: { id: string; name: string }) => {
        if (!uniqueTags.has(tag.id)) {
          uniqueTags.set(tag.id, tag.name);
        }
      });
    });

    const technologies = Array.from(uniqueTags, ([id, name]) => ({ id, name }));
    this.groupedTechnologies = technologies.slice(0, this.showAllTechnologies ? technologies.length : this.initialTechCount);
  }

  getTechCount(technology: { id: string }): number {
    return this.originalQuestions.filter((question) =>
      question.tags.some((tag: { id: string }) => tag.id === technology.id)
    ).length;
  }

  showMore() {
    this.showAllTechnologies = true;
    this.groupTechnologies();
  }

  filterQuestions(technology: { id: string }) {
    if (technology) {
      this.questions = this.originalQuestions.filter((question) =>
        question.tags.some((tag: { id: string }) => tag.id === technology.id)
      );
    } else {
      this.questions = [...this.originalQuestions];
    }
  }

  get remainingTechnologiesCount(): number {
    const totalTechnologies = new Set(
      this.originalQuestions.flatMap((question) => question.tags.map((tag: { id: string }) => tag.id))
    ).size;
    return totalTechnologies - this.initialTechCount;
  }

  protected readonly formatDate = formatDate;

  shouldShowFooter(): boolean {
    return !this.showAllTechnologies && this.remainingTechnologiesCount > 0;
  }
}
