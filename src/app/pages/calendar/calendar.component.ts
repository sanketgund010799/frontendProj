import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService, CalendarEvent } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Calendar..."></app-loader>
    <div class="calendar-page" *ngIf="!loading">
      <div class="page-header">
        <div>
          <h1>Calendar</h1>
          <p>View your monthly schedule and events</p>
        </div>
        <div class="calendar-nav">
          <button class="btn btn-outline btn-sm" (click)="prevMonth()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="current-month">{{ monthName }} {{ year }}</span>
          <button class="btn btn-outline btn-sm" (click)="nextMonth()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      <div class="legend">
        <span class="legend-item"><span class="legend-dot present"></span> Present</span>
        <span class="legend-item"><span class="legend-dot absent"></span> Absent</span>
        <span class="legend-item"><span class="legend-dot birthday"></span> Birthday</span>
        <span class="legend-item"><span class="legend-dot event"></span> Company Event</span>
      </div>

      <div class="card calendar-card">
        <div class="calendar-grid">
          <div class="calendar-header-cell" *ngFor="let day of weekDays">{{ day }}</div>
          <div *ngFor="let cell of calendarCells"
               class="calendar-cell"
               [class.other-month]="!cell.currentMonth"
               [class.today]="cell.isToday">
            <span class="cell-date">{{ cell.day }}</span>
            <div class="cell-events">
              <div *ngFor="let evt of cell.events"
                   class="cell-event"
                   [ngClass]="getEventClass(evt.type)"
                   [title]="evt.title">
                {{ getEventLabel(evt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-page { animation: fadeIn 0.3s ease; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .calendar-nav { display: flex; align-items: center; gap: 16px; }
    .current-month { font-size: 18px; font-weight: 600; min-width: 180px; text-align: center; }
    .legend { display: flex; gap: 20px; margin-bottom: 16px; flex-wrap: wrap; }
    .legend-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
    .legend-dot.present { background: #27ae60; }
    .legend-dot.absent { background: #e74c3c; }
    .legend-dot.birthday { background: #e91e63; }
    .legend-dot.event { background: #2980b9; }
    .calendar-card { padding: 16px; overflow: hidden; }
    .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--border); }
    .calendar-header-cell {
      background: var(--primary-light); padding: 12px 8px; text-align: center;
      font-weight: 600; font-size: 13px; color: var(--primary-dark);
      text-transform: uppercase;
    }
    .calendar-cell {
      background: #fff; min-height: 100px; padding: 8px;
      position: relative; transition: background 0.2s;
    }
    .calendar-cell:hover { background: #f8f9fa; }
    .calendar-cell.other-month { background: #fafafa; }
    .calendar-cell.other-month .cell-date { color: var(--text-muted); }
    .calendar-cell.today { background: #f0f7ff; }
    .calendar-cell.today .cell-date {
      background: var(--primary); color: #fff; width: 28px; height: 28px;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    .cell-date { font-size: 13px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary); }
    .cell-events { display: flex; flex-direction: column; gap: 2px; }
    .cell-event {
      font-size: 11px; padding: 2px 6px; border-radius: 4px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      cursor: pointer;
    }
    .cell-event.evt-present { background: #d4edda; color: #155724; }
    .cell-event.evt-absent { background: #f8d7da; color: #721c24; }
    .cell-event.evt-birthday { background: #fce4ec; color: #880e4f; }
    .cell-event.evt-company { background: #d1ecf1; color: #0c5460; }

    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
      .calendar-cell { min-height: 70px; padding: 4px; }
      .cell-date { font-size: 11px; }
      .cell-event { font-size: 9px; padding: 1px 4px; }
      .calendar-header-cell { padding: 8px 4px; font-size: 11px; }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class CalendarComponent implements OnInit {
  loading = true;
  events: CalendarEvent[] = [];
  year = 2026;
  month = 2; // 0-indexed: March = 2
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarCells: { day: number; currentMonth: boolean; isToday: boolean; events: CalendarEvent[] }[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
    setTimeout(() => {
      this.events = this.mockData.getCalendarEvents();
      this.buildCalendar();
      this.loading = false;
    }, 600);
  }

  get monthName(): string {
    return new Date(this.year, this.month).toLocaleString('en-US', { month: 'long' });
  }

  prevMonth(): void {
    if (this.month === 0) { this.month = 11; this.year--; } else { this.month--; }
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.month === 11) { this.month = 0; this.year++; } else { this.month++; }
    this.buildCalendar();
  }

  buildCalendar(): void {
    this.calendarCells = [];
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.year, this.month, 0).getDate();
    const today = new Date();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      this.calendarCells.push({ day: daysInPrevMonth - i, currentMonth: false, isToday: false, events: [] });
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvents = this.events.filter(e => e.date === dateStr);
      const isToday = today.getFullYear() === this.year && today.getMonth() === this.month && today.getDate() === d;
      this.calendarCells.push({ day: d, currentMonth: true, isToday, events: dayEvents });
    }
    // Next month days
    const remaining = 42 - this.calendarCells.length;
    for (let d = 1; d <= remaining; d++) {
      this.calendarCells.push({ day: d, currentMonth: false, isToday: false, events: [] });
    }
  }

  getEventClass(type: string): string {
    switch (type) {
      case 'Present': return 'evt-present';
      case 'Absent': return 'evt-absent';
      case 'Birthday': return 'evt-birthday';
      case 'Company Event': return 'evt-company';
      default: return '';
    }
  }

  getEventLabel(evt: CalendarEvent): string {
    if (evt.type === 'Present' || evt.type === 'Absent') return evt.type;
    return evt.title;
  }
}
