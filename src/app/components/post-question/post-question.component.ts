import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {QuestionService} from '../../services/questionService/question.service';


@Component({
  selector: 'app-post-question',
  standalone: true,
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css'],
  imports: [FormsModule, CommonModule] // Add CommonModule to imports
})
export class PostQuestionComponent {
onKeyDown(event: KeyboardEvent) {


   if(event.key=='Enter'|| event.key==','){
      this.addTag()
      event.preventDefault()
   }
}
  questionTitle: string = '';
  description: string = '';
  tags: string[] = []; // Change tags to an array for dynamic management
  currentTag: string = ''; // New property to hold the current tag input
  successMessage: string = '';
  formSubmitted: boolean = false; // Track if the form has been submitted

addTag(): void {
  if (this.currentTag && !this.tags.includes(this.currentTag.trim())) {
    this.tags.push(this.currentTag.trim());
   }
     this.currentTag = '';} // clear input field
  // Method to remove a tag
  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  constructor(private questionService: QuestionService) {
  }
  // Method to handle form submission
  onSubmit() {
    this.formSubmitted = true; // Set to true to show validation feedback
    if (!this.questionTitle || !this.description) {
      return; // Prevent submission if validation fails
    }

    const questionData = {
      title: this.questionTitle,
      description: this.description,
      tags: this.tags.map(tagName => ({ id: null, name: tagName })),
      userId : 1
    };

    this.questionService.postQuestion(questionData).subscribe(response => {
      if (response) {
        this.successMessage = 'Your question has been posted successfully!';
      }
    }, error => {
      console.error(error);
    })
    // Reset the form
    this.questionTitle = '';
    this.description = '';
    this.tags = [];
    this.currentTag = '';
    this.formSubmitted = false; // Reset form submission status
  }
}
