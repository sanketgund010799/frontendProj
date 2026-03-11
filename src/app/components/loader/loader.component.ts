import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" *ngIf="loading">
      <div class="loader-container">
        <div class="loader-spinner"></div>
        <p class="loader-text">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.85); display: flex;
      align-items: center; justify-content: center; z-index: 9999;
      backdrop-filter: blur(4px);
    }
    .loader-container { text-align: center; }
    .loader-spinner {
      width: 48px; height: 48px; border: 4px solid #e1e8ed;
      border-top-color: var(--primary, #3a6b9f); border-radius: 50%;
      animation: spin 0.8s linear infinite; margin: 0 auto 16px;
    }
    .loader-text { color: var(--text-secondary, #7f8c8d); font-size: 14px; font-weight: 500; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoaderComponent {
  @Input() loading = false;
  @Input() message = 'Loading...';
}
