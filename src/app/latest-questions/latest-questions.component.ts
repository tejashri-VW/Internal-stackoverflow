// latest-questions.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-questions',
  standalone: true,
  templateUrl: './latest-questions.component.html',
  styleUrls: ['./latest-questions.component.css'],
  imports: [CommonModule]
})
export class LatestQuestionsComponent {
  questions = [
    {
      title: 'Is there a way to create formula in Catia via Macro to link parameters?',
      body: 'The main goal is to link between two parameters via...',
      votes: 0,
      views: 2,
      tags: ['Python', 'PHP'],
      postedBy: 'Tj',
      datePosted: '11/09/2023'
    },
    {
      title: 'How to implement an HTTP request in Angular?',
      body: 'Can someone explain how to make an HTTP request in Angular?',
      votes: 5,
      views: 10,
      tags: ['Angular', 'HTTP'],
      postedBy: 'Alex',
      datePosted: '11/10/2023'
    },
    {
      title: 'What are some best practices for REST API design?',
      body: 'I’m looking for recommendations on REST API design best practices.',
      votes: 3,
      views: 7,
      tags: ['REST', 'API'],
      postedBy: 'Sam',
      datePosted: '11/11/2023'
    }
    // Add more questions as needed
  ];
}
