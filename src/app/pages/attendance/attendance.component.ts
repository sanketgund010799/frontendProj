import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService, AttendanceRecord } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Attendance..."></app-loader>
    <div class="attendance-page" *ngIf="!loading">
      <div class="page-header">
        <div>
          <h1>Attendance</h1>
          <p>Track your monthly attendance</p>
        </div>
        <div class="month-filter">
          <input type="month" class="form-control" [(ngModel)]="selectedMonth">
        </div>
      </div>

      <div class="summary-grid">
        <div class="summary-card present">
          <div class="summary-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div class="summary-info">
            <span class="summary-value">{{ presentCount }}</span>
            <span class="summary-label">Present</span>
          </div>
        </div>
        <div class="summary-card absent">
          <div class="summary-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
          <div class="summary-info">
            <span class="summary-value">{{ absentCount }}</span>
            <span class="summary-label">Absent</span>
          </div>
        </div>
        <div class="summary-card halfday">
          <div class="summary-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div class="summary-info">
            <span class="summary-value">{{ halfDayCount }}</span>
            <span class="summary-label">Half-Day</span>
          </div>
        </div>
        <div class="summary-card leaves">
          <div class="summary-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
          </div>
          <div class="summary-info">
            <span class="summary-value">{{ leaveCount }}</span>
            <span class="summary-label">Leaves</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of attendance">
                <td>{{ record.date }}</td>
                <td>{{ record.checkIn }}</td>
                <td>{{ record.checkOut }}</td>
                <td>{{ record.workingHours }}</td>
                <td>
                  <span class="badge" [ngClass]="getStatusBadge(record.status)">{{ record.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .attendance-page { animation: fadeIn 0.3s ease; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .month-filter { width: 200px; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .summary-card {
      background: #fff; border-radius: var(--radius); padding: 20px;
      display: flex; align-items: center; gap: 16px;
      box-shadow: var(--shadow); transition: var(--transition);
      border-left: 4px solid transparent;
    }
    .summary-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
    .summary-card.present { border-left-color: #27ae60; }
    .summary-card.absent { border-left-color: #e74c3c; }
    .summary-card.halfday { border-left-color: #f39c12; }
    .summary-card.leaves { border-left-color: #2980b9; }
    .summary-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
    }
    .present .summary-icon { background: #d4edda; color: #27ae60; }
    .absent .summary-icon { background: #f8d7da; color: #e74c3c; }
    .halfday .summary-icon { background: #fff3cd; color: #f39c12; }
    .leaves .summary-icon { background: #d1ecf1; color: #2980b9; }
    .summary-info { display: flex; flex-direction: column; }
    .summary-value { font-size: 24px; font-weight: 700; }
    .summary-label { font-size: 13px; color: var(--text-secondary); }

    @media (max-width: 1024px) { .summary-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
      .month-filter { width: 100%; }
      .summary-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) { .summary-grid { grid-template-columns: 1fr; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class AttendanceComponent implements OnInit {
  loading = true;
  attendance: AttendanceRecord[] = [];
  selectedMonth = '2026-03';

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.attendance = this.mockData.getAttendance();
      this.loading = false;
    }, 600);
  }

  get presentCount(): number { return this.attendance.filter(a => a.status === 'Present').length; }
  get absentCount(): number { return this.attendance.filter(a => a.status === 'Absent').length; }
  get halfDayCount(): number { return this.attendance.filter(a => a.status === 'Half-Day').length; }
  get leaveCount(): number { return this.attendance.filter(a => a.status === 'Leave').length; }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Present': return 'badge-success';
      case 'Absent': return 'badge-danger';
      case 'Half-Day': return 'badge-warning';
      case 'Leave': return 'badge-info';
      default: return '';
    }
  }
}
