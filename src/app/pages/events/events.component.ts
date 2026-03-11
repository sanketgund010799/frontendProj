import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService, EventItem } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Events..."></app-loader>
    <div class="events-page" *ngIf="!loading">
      <div class="page-header">
        <div>
          <h1>Events</h1>
          <p>Upcoming company events and activities</p>
        </div>
      </div>

      <div class="events-grid">
        <div class="event-card card" *ngFor="let event of events">
          <div class="ribbon" *ngIf="event.isFullDay">Full Day</div>
          <div class="event-top">
            <div class="event-logo" [style.background]="getLogoColor(event.id)">{{ event.logo }}</div>
            <div class="event-dates-badge">
              <span class="event-month">{{ getMonth(event.startDate) }}</span>
              <span class="event-day">{{ getDay(event.startDate) }}</span>
            </div>
          </div>
          <h3 class="event-name">{{ event.name }}</h3>
          <p class="event-desc">{{ event.description }}</p>
          <div class="event-footer">
            <div class="event-date-range">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
              <span>{{ event.startDate }}{{ event.startDate !== event.endDate ? ' - ' + event.endDate : '' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .events-page { animation: fadeIn 0.3s ease; }
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .event-card { position: relative; overflow: hidden; padding: 24px; }
    .event-card:hover { transform: translateY(-4px); }
    .ribbon {
      position: absolute; top: 16px; right: -30px;
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: #fff; font-size: 11px; font-weight: 600;
      padding: 4px 36px; transform: rotate(45deg);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .event-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .event-logo {
      width: 52px; height: 52px; border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 700; font-size: 16px;
    }
    .event-dates-badge {
      display: flex; flex-direction: column; align-items: center;
      background: var(--primary-light); border-radius: 10px; padding: 8px 14px;
    }
    .event-month { font-size: 11px; color: var(--primary); font-weight: 600; text-transform: uppercase; }
    .event-day { font-size: 20px; font-weight: 700; color: var(--primary-dark); line-height: 1; }
    .event-name { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .event-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .event-footer { padding-top: 12px; border-top: 1px solid var(--border); }
    .event-date-range { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); }

    @media (max-width: 768px) { .events-grid { grid-template-columns: 1fr; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class EventsComponent implements OnInit {
  loading = true;
  events: EventItem[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.events = this.mockData.getEvents();
      this.loading = false;
    }, 600);
  }

  getLogoColor(id: number): string {
    const colors = ['linear-gradient(135deg,#e74c3c,#e95e4e)', 'linear-gradient(135deg,#3a6b9f,#5a9fd4)', 'linear-gradient(135deg,#f39c12,#f1c40f)', 'linear-gradient(135deg,#27ae60,#2ecc71)', 'linear-gradient(135deg,#9b59b6,#b07cc6)', 'linear-gradient(135deg,#1abc9c,#2cd9b0)'];
    return colors[(id - 1) % colors.length];
  }

  getMonth(date: string): string {
    return new Date(date + 'T00:00:00').toLocaleString('en-US', { month: 'short' });
  }

  getDay(date: string): string {
    return new Date(date + 'T00:00:00').getDate().toString();
  }
}
