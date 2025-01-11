import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from '../code-snippet/code-editor.component';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {AnswerService} from '../../services/answerService/answer.service';

interface Answer {
  questionId:number;
  userId: number;
  dateAnswered: Date;
  body: string;
  attachments?: string[];
  codeSnippets?: { language: string; code: string }[];
  votes: number;
}

@Component({
  selector: 'app-answer-page',
  standalone: true,
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.css'],
  imports: [FormsModule, CommonModule, CodeEditorComponent, CodeSnippetComponent]
})
export class AnswerPageComponent implements OnInit {
  @ViewChild('answerTextarea') answerTextarea!: ElementRef;

  question: any;
  answers: any;

  questionId: any;
  answerBody: string = '';
  selectedFileName: string = '';
  fileUploaded: boolean = false;
  codeSnippets: Array<{ code: string, language: string }> = [];
  showCodeEditor = false;
  uploadedImage: any;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute,
              private answerService: AnswerService,) {}

  ngOnInit() {
    this.questionId = this.route.snapshot.paramMap.get('id');
    this.loadQuestion(this.questionId);
  }

  loadQuestion(id: any) {
    this.answerService.getAnswerByQId(id).subscribe((result) => {
      this.question = result.question;
      console.log(this.question);
      this.answers = result.answers || []; // Ensure answers list is initialized
    });
  }

  formatContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  openCodeEditor() {
    this.showCodeEditor = true;
  }

  onCodeSubmit(result: { code: string, language: string }) {
    this.codeSnippets.push(result);
    this.answerBody += `\n[code-snippet-${this.codeSnippets.length - 1}]\n`;
    this.showCodeEditor = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.fileUploaded = true;
    }
  }


  submitAnswer() {
    if (!this.answerBody.trim()) return;

    const processedBody = this.processBodyWithCodeSnippets(this.answerBody);
    debugger

    const newAnswer: Answer = {
      questionId: this.questionId,
      body: processedBody,
      userId: this.question.userId,
      dateAnswered: new Date(),
      votes: 0,
      attachments: this.selectedFileName ? [this.selectedFileName] : undefined,
      codeSnippets: [...this.codeSnippets]
    };

    this.answerService.submitAnswer(newAnswer).subscribe(
      result => {
        this.answers.unshift(result);
        this.fileUploaded = false;
        this.codeSnippets = [];
        this.answerBody = '';
        this.selectedFileName = '';
      },error => {
        console.log(error);
      }
    );
  }

  private processBodyWithCodeSnippets(body: string): string {
    debugger
    return body.replace(/\[code-snippet-\d+\]/g, '').trim();
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  protected readonly formatDate = formatDate;
}
