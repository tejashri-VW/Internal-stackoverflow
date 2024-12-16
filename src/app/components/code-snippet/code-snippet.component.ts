import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-snippet">
      <div class="code-header">
        <span class="language">{{ language }}</span>
        <button class="copy-button" (click)="copyCode()" [class.copied]="isCopied">
          <span class="icon">{{ isCopied ? '✓' : '📋' }}</span>
          {{ isCopied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <div class="code-box">
        <pre><code [innerHTML]="highlightedCode"></code></pre>
      </div>
    </div>
  `,
  styles: [`
    .code-snippet {
      background: #282c34; /* Darker background for better contrast */
      border-radius: 8px;
      margin: 1rem 0;
      overflow: hidden;
      font-family: 'Fira Code', 'Consolas', 'Monaco', monospace; /* Fira Code for better font rendering */
      /*max-width: 100%; !* Make the width responsive *!*/
      /*max-height: 350px; !* Set a maximum height for the snippet box *!*/
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Slight shadow for better visibility */
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: #2c323c;
      border-bottom: 1px solid #3a3f47;
    }

    .language {
      color: #8c8c8c;
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: 500;
    }

    .copy-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid #4d4d4d;
      border-radius: 4px;
      color: #e0e0e0;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #6d6d6d;
      }

      &.copied {
        background: #2ea043;
        border-color: #2ea043;
      }

      .icon {
        font-size: 1rem;
      }
    }

    .code-box {
      max-height: 350px;
      padding: 1rem;
      overflow: auto; /* Allow scrolling */
      color: #ffd900;
      background: #1e1e1e;
      border-radius: 0 0 8px 8px;
    }

    pre {
      margin: 0;
      padding: 0;
      overflow-x: auto;
      white-space: pre-wrap;
      font-size: 1rem;
    }

    code {
      max-height: 300px;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.5;
      word-wrap: break-word; /* Ensure long lines break */
    }

    :host {
      ::ng-deep .hljs {
        background: transparent;
        padding: 1rem;
        border-radius: 8px;
      }

      /* Syntax colors */
      ::ng-deep .hljs-keyword { color: #c678dd; }
      ::ng-deep .hljs-string { color: #98c379; }
      ::ng-deep .hljs-number { color: #d19a66; }
      ::ng-deep .hljs-function { color: #61afef; }
      ::ng-deep .hljs-comment { color: #7f848e; font-style: italic; }
      ::ng-deep .hljs-class { color: #e06c75; }
      ::ng-deep .hljs-variable { color: #56b6c2; }
      ::ng-deep .hljs-selector-tag { color: #e5c07b; }
      ::ng-deep .hljs-built_in { color: #61afef; }
      ::ng-deep .hljs-title { color: #e5c07b; }
      ::ng-deep .hljs-tag { color: #f08d49; }
      ::ng-deep .hljs- { color: #f08d49; }
    }
  `]
})
export class CodeSnippetComponent {
  @Input() code: string = '';
  @Input() language: string = 'typescript';

  isCopied = false;
  highlightedCode = '';

  ngOnInit() {
    this.highlightCode();
  }

  ngOnChanges() {
    this.highlightCode();
  }

  private highlightCode() {
    if (this.code) {
      this.highlightedCode = hljs.highlight(this.code, {
        language: this.language
      }).value;
    }
  }

  copyCode() {
    navigator.clipboard.writeText(this.code).then(() => {
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    });
  }
}
