import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="code-editor-overlay" (click)="closePopUp()">
      <div class="code-editor-modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Add Code Snippet</h2>
          <button class="close-button" (click)="closePopUp()">×</button>
        </div>

        <div class="modal-content">
          <div class="language-select">
            <label for="language">Language:</label>
            <select id="language" [(ngModel)]="selectedLanguage">
              <option *ngFor="let lang of languages" [value]="lang.value">
                {{lang.label}}
              </option>
            </select>
          </div>

          <div class="code-input">
            <textarea
              [(ngModel)]="code"
              placeholder="Paste your code here..."
              rows="10"
            ></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-button" (click)="closePopUp()">Cancel</button>
          <button
            class="insert-button"
            [disabled]="!code.trim()"
            (click)="insertCode()"
          >
            Insert Code
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .code-editor-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .code-editor-modal {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;

      h2 {
        margin: 0;
        font-size: 1.25rem;
        color: #333;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        padding: 0.5rem;

        &:hover {
          color: #333;
        }
      }
    }

    .modal-content {
      padding: 1rem;
      overflow-y: auto;
    }

    .language-select {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #555;
      }

      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: #0066cc;
        }
      }
    }

    .code-input {
      textarea {
        width: 100%;
        min-height: 200px;
        padding: 1rem;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #f8f9fa;
        resize: vertical;

        &:focus {
          outline: none;
          border-color: #0066cc;
        }
      }
    }

    .modal-footer {
      padding: 1rem;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;

      button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .cancel-button {
        background: none;
        border: 1px solid #ddd;
        color: #666;

        &:hover {
          background: #f5f5f5;
        }
      }

      .insert-button {
        background: #0066cc;
        border: 1px solid #0066cc;
        color: white;

        &:hover:not(:disabled) {
          background: #0052a3;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  `]
})
export class CodeEditorComponent {
  @Output() close:any = new EventEmitter<void>();
  @Output() submit:any = new EventEmitter<{code: string, language: string}>();

  code = '';
  selectedLanguage = 'typescript';

  languages = [
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'SCSS' }
  ];

  insertCode() {
    if (this.code.trim()) {
      this.submit.emit({
        code: this.code,
        language: this.selectedLanguage
      });
      this.close.emit();
    }
  }

  closePopUp() {
    this.close.emit();
  }
}
