import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MockDataService, Project } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Projects..."></app-loader>
    <div class="projects-page" *ngIf="!loading">
      <div class="page-header">
        <div>
          <h1>Projects</h1>
          <p>View and manage your assigned projects</p>
        </div>
      </div>

      <div class="projects-grid">
        <div class="project-card card" *ngFor="let project of projects" (click)="openProject(project.id)">
          <div class="project-header">
            <div class="project-logo" [style.background]="getLogoColor(project.id)">{{ project.logo }}</div>
            <span class="badge" [ngClass]="getStatusBadge(project.status)">{{ project.status }}</span>
          </div>
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-dates">
            <div class="date-item">
              <span class="date-label">Start</span>
              <span class="date-value">{{ project.startDate }}</span>
            </div>
            <div class="date-item">
              <span class="date-label">End</span>
              <span class="date-value">{{ project.endDate }}</span>
            </div>
          </div>
          <div class="project-footer">
            <div class="avatar-stack">
              <div *ngFor="let emp of project.employees.slice(0,3)" class="mini-avatar" [title]="emp.name">{{ emp.avatar }}</div>
              <div *ngIf="project.employees.length > 3" class="mini-avatar more">+{{ project.employees.length - 3 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .projects-page { animation: fadeIn 0.3s ease; }
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .project-card { cursor: pointer; padding: 24px; }
    .project-card:hover { transform: translateY(-4px); }
    .project-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .project-logo {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 700; font-size: 14px;
    }
    .project-name { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .project-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .project-dates { display: flex; gap: 24px; margin-bottom: 16px; }
    .date-item { display: flex; flex-direction: column; }
    .date-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    .date-value { font-size: 13px; font-weight: 500; }
    .project-footer { display: flex; align-items: center; justify-content: space-between; }
    .avatar-stack { display: flex; }
    .mini-avatar {
      width: 32px; height: 32px; border-radius: 50%; background: var(--primary);
      color: #fff; font-size: 10px; font-weight: 600;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid #fff; margin-left: -8px;
    }
    .mini-avatar:first-child { margin-left: 0; }
    .mini-avatar.more { background: var(--text-muted); font-size: 11px; }

    @media (max-width: 768px) {
      .projects-grid { grid-template-columns: 1fr; }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class ProjectsComponent implements OnInit {
  loading = true;
  projects: Project[] = [];

  constructor(private mockData: MockDataService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.projects = this.mockData.getProjects();
      this.loading = false;
    }, 600);
  }

  openProject(id: number): void {
    this.router.navigate(['/projects', id]);
  }

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
