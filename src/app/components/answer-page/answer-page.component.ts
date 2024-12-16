import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from '../code-snippet/code-editor.component';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Answer {
  id:number;
  answeredBy: string;
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
  answers: Answer[] = [
    {
      id: 1,
      body: 'Here\'s how you can implement Angular routing with lazy loading:',
      answeredBy: 'Jane Smith',
      dateAnswered: new Date('2024-01-16'),
      votes: 15,
      codeSnippets: [
        {
          language: 'typescript',
          code: `<div class="answer-content">
  <div class="answer-body" [innerHTML]="formatContent(answer.body)"></div>
<!--  <div *ngFor="let snippet of answer.codeSnippets">-->
    <app-code-snippet
      [code]="snippet.code"
      [language]="snippet.language">
    </app-code-snippet>
  </div>
</div>
`
        }
      ]
    },
    {
      id: 2,
      body: 'To handle HTTP errors properly in Angular, use the catchError operator:',
      answeredBy: 'John Doe',
      dateAnswered: new Date('2024-01-17'),
      votes: 8,
      codeSnippets: [
        {
          language: 'typescript',
          code: `@Injectable()
export class ErrorHandlingService {
  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = \`Error Code: \${error.status}\nMessage: \${error.message}\`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}`
        }
      ]
    }
  ];

  answerBody: string = '';
  selectedFileName: string = '';
  fileUploaded: boolean = false;
  codeSnippets: Array<{ code: string, language: string }> = [];
  showCodeEditor = false;
  uploadedImage: any;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {}

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

    const newAnswer: Answer = {
      id: this.answers.length + 1,
      body: processedBody,
      answeredBy: 'Current User',
      dateAnswered: new Date(),
      votes: 0,
      attachments: this.selectedFileName ? [this.selectedFileName] : undefined,
      codeSnippets: this.codeSnippets
    };

    this.answers.unshift(newAnswer);
    this.answerBody = '';
    this.selectedFileName = '';
    this.fileUploaded = false;
    this.codeSnippets = [];
  }

  private processBodyWithCodeSnippets(body: string): string {
    return body.replace(
      /\[code-snippet-(\d+)\]/g,
      (_, index) => {
        const snippet = this.codeSnippets[parseInt(index)];
        return `<pre><code class="language-${snippet.language}">${this.escapeHtml(snippet.code)}</code></pre>`;
      }
    );
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  protected readonly formatDate = formatDate;
}
