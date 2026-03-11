import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService, Project } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Project..."></app-loader>
    <div class="project-detail" *ngIf="!loading && project">
      <div class="page-header">
        <button class="btn btn-outline btn-sm" (click)="goBack()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Projects
        </button>
      </div>

      <div class="detail-header card">
        <div class="detail-top">
          <div class="project-logo" [style.background]="getLogoColor(project.id)">{{ project.logo }}</div>
          <div class="detail-info">
            <h1>{{ project.name }}</h1>
            <span class="badge" [ngClass]="getStatusBadge(project.status)">{{ project.status }}</span>
          </div>
        </div>
        <div class="detail-dates">
          <div class="date-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
            Start: {{ project.startDate }}
          </div>
          <div class="date-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
            End: {{ project.endDate }}
          </div>
        </div>
      </div>

      <div class="detail-grid">
        <div class="card">
          <h2 class="section-title">Description</h2>
          <p class="description-text">{{ project.description }}</p>
        </div>

        <div class="card">
          <h2 class="section-title">Team Members ({{ project.employees.length }})</h2>
          <div class="team-list">
            <div class="team-member" *ngFor="let emp of project.employees">
              <div class="member-avatar" [style.background]="'linear-gradient(135deg,#3a6b9f,#5a9fd4)'">{{ emp.avatar }}</div>
              <div class="member-info">
                <span class="member-name">{{ emp.name }}</span>
                <span class="member-role">{{ emp.role }}</span>
              </div>
            </div>
            <div *ngIf="project.employees.length === 0" class="empty-state">No team members assigned</div>
          </div>
        </div>

        <div class="card">
          <h2 class="section-title">Documents ({{ project.documents.length }})</h2>
          <div class="table-wrapper" *ngIf="project.documents.length > 0">
            <table>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Size</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let doc of project.documents">
                  <td>
                    <div class="doc-name">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      {{ doc.name }}
                    </div>
                  </td>
                  <td>{{ doc.size }}</td>
                  <td>{{ doc.date }}</td>
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
          <div *ngIf="project.documents.length === 0" class="empty-state">No documents uploaded</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-detail { animation: fadeIn 0.3s ease; }
    .page-header { margin-bottom: 20px; }
    .detail-header { margin-bottom: 20px; }
    .detail-top { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
    .project-logo {
      width: 64px; height: 64px; border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 700; font-size: 18px; flex-shrink: 0;
    }
    .detail-info h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .detail-dates { display: flex; gap: 16px; flex-wrap: wrap; }
    .date-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; background: var(--bg-main); border-radius: 20px;
      font-size: 13px; color: var(--text-secondary);
    }
    .detail-grid { display: flex; flex-direction: column; gap: 20px; }
    .section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; }
    .description-text { color: var(--text-secondary); line-height: 1.7; font-size: 14px; }
    .team-list { display: flex; flex-direction: column; gap: 12px; }
    .team-member { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg-main); border-radius: 10px; }
    .member-avatar {
      width: 40px; height: 40px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 600; font-size: 13px; flex-shrink: 0;
    }
    .member-info { display: flex; flex-direction: column; }
    .member-name { font-size: 14px; font-weight: 600; }
    .member-role { font-size: 12px; color: var(--text-secondary); }
    .doc-name { display: flex; align-items: center; gap: 8px; }
    .empty-state { text-align: center; padding: 32px; color: var(--text-muted); font-size: 14px; }

    @media (max-width: 768px) {
      .detail-info h1 { font-size: 20px; }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class ProjectDetailComponent implements OnInit {
  loading = true;
  project: Project | undefined;

  constructor(private mockData: MockDataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    setTimeout(() => {
      this.project = this.mockData.getProjects().find(p => p.id === id);
      this.loading = false;
    }, 500);
  }

  goBack(): void { this.router.navigate(['/projects']); }

  getLogoColor(id: number): string {
    const colors = ['linear-gradient(135deg,#3a6b9f,#5a9fd4)', 'linear-gradient(135deg,#27ae60,#2ecc71)', 'linear-gradient(135deg,#e74c3c,#e95e4e)', 'linear-gradient(135deg,#f39c12,#f1c40f)', 'linear-gradient(135deg,#9b59b6,#b07cc6)', 'linear-gradient(135deg,#1abc9c,#2cd9b0)'];
    return colors[(id - 1) % colors.length];
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Active': return 'badge-success';
      case 'In Progress': return 'badge-info';
      case 'Completed': return 'badge-primary';
      case 'On Hold': return 'badge-warning';
      default: return '';
    }
  }
}
