import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
import {CommonModule, formatDate} from '@angular/common';  // Import CommonModule for ngFor

@Component({
  selector: 'app-latest-questions',
  templateUrl: './latest-questions.component.html',
  styleUrls: ['./latest-questions.component.css'],
  standalone: true,  // Keep the standalone flag if it's a standalone component
  imports: [CommonModule, RouterModule]  // Import CommonModule here for *ngFor and RouterModule for routing
})
export class LatestQuestionsComponent implements OnInit {
  questions = [
    {
      id: '1',
      title: 'Is there a way to create formula in Catia via Macro to link parameters?',
      body: 'The main goal is to link between two parameters...',
      votes: 0,
      views: 2,
      tags: ['Catia', 'Macro'],
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
    },
    {
      id: '4',
      title: 'What are some best practices for REST API design?',
      body: 'I’m looking for recommendations on REST API design...',
      votes: 3,
      views: 7,
      tags: ['API', 'REST'],
      postedBy: 'Charlie',
      postedDate: '2024-12-02'
    },
    {
      id: '5',
      title: 'What are some best practices for REST API design?',
      body: 'I’m looking for recommendations on REST API design...',
      votes: 3,
      views: 7,
      tags: ['API', 'REST'],
      postedBy: 'Charlie',
      postedDate: '2024-12-02'
    },
    {
      id: '6',
      title: 'What are some best practices for REST API design?',
      body: 'I’m looking for recommendations on REST API design...',
      votes: 3,
      views: 7,
      tags: ['API', 'REST'],
      postedBy: 'Charlie',
      postedDate: '2024-12-02'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  protected readonly formatDate = formatDate;
}
