import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService, EmployeeProfile } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Profile..."></app-loader>
    <div class="profile-page" *ngIf="!loading && profile">
      <div class="page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your personal information</p>
        </div>
        <button class="btn" [ngClass]="editing ? 'btn-success' : 'btn-primary'" (click)="toggleEdit()">
          <svg *ngIf="!editing" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <svg *ngIf="editing" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          {{ editing ? 'Save Changes' : 'Edit Profile' }}
        </button>
      </div>

      <div class="profile-grid">
        <div class="card profile-card">
          <div class="profile-header">
            <div class="profile-avatar-lg" [style.background]="'linear-gradient(135deg,#3a6b9f,#5a9fd4)'">{{ profile.avatar }}</div>
            <div class="profile-title">
              <h2>{{ profile.name }}</h2>
              <p>{{ profile.designation }}</p>
              <span class="badge badge-primary">{{ profile.employeeId }}</span>
            </div>
          </div>

          <div class="profile-details">
            <div class="detail-row">
              <div class="detail-item">
                <label>Full Name</label>
                <input *ngIf="editing" class="form-control" [(ngModel)]="profile.name">
                <span *ngIf="!editing">{{ profile.name }}</span>
              </div>
              <div class="detail-item">
                <label>Email</label>
                <input *ngIf="editing" class="form-control" [(ngModel)]="profile.email">
                <span *ngIf="!editing">{{ profile.email }}</span>
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-item">
                <label>Phone</label>
                <input *ngIf="editing" class="form-control" [(ngModel)]="profile.phone">
                <span *ngIf="!editing">{{ profile.phone }}</span>
              </div>
              <div class="detail-item">
                <label>Department</label>
                <input *ngIf="editing" class="form-control" [(ngModel)]="profile.department">
                <span *ngIf="!editing">{{ profile.department }}</span>
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-item">
                <label>Designation</label>
                <input *ngIf="editing" class="form-control" [(ngModel)]="profile.designation">
                <span *ngIf="!editing">{{ profile.designation }}</span>
              </div>
              <div class="detail-item">
                <label>Date of Joining</label>
                <span>{{ profile.joinDate }}</span>
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-item full">
                <label>Address</label>
                <input *ngIf="editing" class="form-control" [(ngModel)]="profile.address">
                <span *ngIf="!editing">{{ profile.address }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card documents-card">
          <div class="section-header">
            <h2>Documents</h2>
            <label class="btn btn-outline btn-sm upload-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Document
              <input type="file" hidden (change)="onFileUpload($event)">
            </label>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Upload Date</th>
                  <th>Size</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let doc of profile.documents">
                  <td>
                    <div class="doc-name-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      {{ doc.name }}
                    </div>
                  </td>
                  <td>{{ doc.date }}</td>
                  <td>{{ doc.size }}</td>
                  <td>
                    <button class="btn btn-outline btn-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { animation: fadeIn 0.3s ease; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .profile-grid { display: flex; flex-direction: column; gap: 20px; }
    .profile-header { display: flex; align-items: center; gap: 24px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
    .profile-avatar-lg {
      width: 88px; height: 88px; border-radius: 20px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 700; font-size: 28px; flex-shrink: 0;
      box-shadow: 0 4px 16px rgba(58,107,159,0.3);
    }
    .profile-title h2 { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
    .profile-title p { font-size: 14px; color: var(--text-secondary); margin-bottom: 8px; }
    .profile-details { display: flex; flex-direction: column; gap: 20px; }
    .detail-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .detail-item { display: flex; flex-direction: column; }
    .detail-item.full { grid-column: span 2; }
    .detail-item label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; font-weight: 600; }
    .detail-item span { font-size: 15px; font-weight: 500; }
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .section-header h2 { font-size: 18px; font-weight: 600; }
    .upload-btn { cursor: pointer; }
    .doc-name-cell { display: flex; align-items: center; gap: 8px; }

    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
      .profile-header { flex-direction: column; text-align: center; }
      .detail-row { grid-template-columns: 1fr; }
      .detail-item.full { grid-column: span 1; }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class ProfileComponent implements OnInit {
  loading = true;
  editing = false;
  profile: EmployeeProfile | null = null;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.profile = this.mockData.getEmployeeProfile();
      this.loading = false;
    }, 600);
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && this.profile) {
      const file = input.files[0];
      this.profile.documents.unshift({
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        size: (file.size / 1024).toFixed(0) + ' KB'
      });
    }
  }
}
