import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule, formatDate} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Answer {
  answeredBy: string;
  dateAnswered: string;
  body: string;
  attachments:any;
}

@Component({
  selector: 'app-answer-page',
  standalone: true,
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AnswerPageComponent implements OnInit {
  question: any;
  answers: Answer[] = [];
  answerBody: string = '';
  selectedFile: File | null = null; // To store the selected file
  selectedFileName: string = ''; // To display the name of the selected file
  fileUploaded: boolean = false; // To track file upload status

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const questionId = this.route.snapshot.paramMap.get('id');
    this.loadQuestion(questionId);
  }

  loadQuestion(id: string | null) {
    if (id === '1') {
      this.question = {
        title: 'Is there a way to create formula in Catia via Macro to link parameters?',
        body: 'The main goal is to link between two parameters via...',
        votes: 0,
        views: 2,
        tags: ['Python', 'PHP'],
        postedBy: 'Tj',
        datePosted: '11/09/2023'
      };
    } else if (id === '2') {
      this.question = {
        title: 'How to implement an HTTP request in Angular?',
        body: 'Can someone explain how to make an HTTP request in Angular?',
        votes: 5,
        views: 10,
        tags: ['Angular', 'HTTP'],
        postedBy: 'Alex',
        datePosted: '11/10/2023'
      };
    } else if (id === '3') {
      this.question = {
        title: 'What are some best practices for REST API design?',
        body: 'I’m looking for recommendations on REST API design best practices.',
        votes: 3,
        views: 7,
        tags: ['REST', 'API'],
        postedBy: 'Sam',
        datePosted: '11/11/2023'
      };
    }
  }

  submitAnswer() {
    const newAnswer:Answer = {
      body: this.answerBody,
      dateAnswered: new Date().getDate().toString(),
      answeredBy: 'Current User', // This would typically come from auth service
      attachments: this.selectedFileName ? [this.selectedFileName] : undefined
    };

    // Simulate file upload (you can replace this with actual file upload logic)
    if (this.selectedFile) {
      // Handle the file upload logic (e.g., upload it to the server)
      console.log('File to upload:', this.selectedFile);

      // Simulate file upload success
      this.fileUploaded = true;
    }

    this.answers.push(<Answer>newAnswer);
    this.answerBody = ''; // Reset the answer body
    this.selectedFile = null; // Reset the selected file
    this.selectedFileName = ''; // Reset the file name
  }

  // This function handles file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.fileUploaded = false; // Reset the uploaded status when a new file is selected
    }
  }

  protected readonly formatDate = formatDate;
}
