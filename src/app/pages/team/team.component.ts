import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService, TeamMember } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Team..."></app-loader>
    <div class="team-page" *ngIf="!loading">
      <div class="page-header">
        <div>
          <h1>Team</h1>
          <p>Your team members and colleagues</p>
        </div>
      </div>

      <div class="team-grid">
        <div class="team-card card" *ngFor="let member of members">
          <div class="member-status-dot" [class.active]="member.status === 'Active'" [class.inactive]="member.status === 'Inactive'"></div>
          <div class="member-avatar" [style.background]="getAvatarColor(member.id)">{{ member.avatar }}</div>
          <h3 class="member-name">{{ member.name }}</h3>
          <p class="member-designation">{{ member.designation }}</p>
          <span class="badge" [ngClass]="member.status === 'Active' ? 'badge-success' : 'badge-danger'">
            {{ member.status }}
          </span>
          <div class="member-actions">
            <button class="btn btn-primary btn-sm" (click)="sendMessage(member)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-page { animation: fadeIn 0.3s ease; }
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .team-card {
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 32px 24px; position: relative;
    }
    .team-card:hover { transform: translateY(-4px); }
    .member-status-dot {
      position: absolute; top: 16px; right: 16px;
      width: 12px; height: 12px; border-radius: 50%;
      border: 2px solid #fff; box-shadow: 0 0 0 2px;
    }
    .member-status-dot.active { background: #27ae60; box-shadow: 0 0 0 2px rgba(39,174,96,0.2); }
    .member-status-dot.inactive { background: #e74c3c; box-shadow: 0 0 0 2px rgba(231,76,60,0.2); }
    .member-avatar {
      width: 72px; height: 72px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 700; font-size: 22px; margin-bottom: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .member-name { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
    .member-designation { font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; }
    .member-actions { margin-top: 16px; }

    @media (max-width: 768px) { .team-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); } }
    @media (max-width: 480px) { .team-grid { grid-template-columns: 1fr; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class TeamComponent implements OnInit {
  loading = true;
  members: TeamMember[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.members = this.mockData.getTeamMembers();
      this.loading = false;
    }, 600);
  }

  getAvatarColor(id: number): string {
    const colors = ['linear-gradient(135deg,#3a6b9f,#5a9fd4)', 'linear-gradient(135deg,#e74c3c,#e95e4e)', 'linear-gradient(135deg,#27ae60,#2ecc71)', 'linear-gradient(135deg,#f39c12,#f1c40f)', 'linear-gradient(135deg,#9b59b6,#b07cc6)', 'linear-gradient(135deg,#1abc9c,#2cd9b0)'];
    return colors[(id - 1) % colors.length];
  }

  sendMessage(member: TeamMember): void {
    alert(`Opening chat with ${member.name}...`);
  }
}
