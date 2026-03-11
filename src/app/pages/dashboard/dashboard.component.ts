import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { MockDataService, Holiday } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Dashboard..."></app-loader>
    <div class="dashboard" *ngIf="!loading">
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Sanket! Here's your overview.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon leaves-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">24</span>
            <span class="stat-label">Total Leaves</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon available-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">18</span>
            <span class="stat-label">Available Leaves</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon projects-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">6</span>
            <span class="stat-label">Total Projects</span>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="card holidays-card">
          <div class="card-header">
            <h2>Upcoming Holidays</h2>
            <span class="badge badge-primary">{{ holidays.length }} holidays</span>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Date</th>
                  <th>Holiday Name</th>
                  <th>Day</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let h of holidays">
                  <td>{{ h.no }}</td>
                  <td>{{ h.date }}</td>
                  <td>{{ h.name }}</td>
                  <td>{{ h.day }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card chart-card">
          <div class="card-header">
            <h2>Weekly Working Hours</h2>
            <span class="badge badge-info">This Week</span>
          </div>
          <div class="chart-container">
            <canvas #weeklyChart></canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { animation: fadeIn 0.3s ease; }
    .page-header { margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    .stat-card {
      background: #fff; border-radius: var(--radius); padding: 24px;
      display: flex; align-items: center; gap: 20px;
      box-shadow: var(--shadow); transition: var(--transition);
    }
    .stat-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
    .stat-icon {
      width: 56px; height: 56px; border-radius: 14px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .leaves-icon { background: #ffeaa7; color: #f39c12; }
    .available-icon { background: #d4edda; color: #27ae60; }
    .projects-icon { background: #d1ecf1; color: #2980b9; }
    .stat-info { display: flex; flex-direction: column; }
    .stat-value { font-size: 28px; font-weight: 700; line-height: 1.2; }
    .stat-label { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
    .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .card-header h2 { font-size: 16px; font-weight: 600; }
    .chart-container { position: relative; height: 280px; }
    .holidays-card { overflow: hidden; }

    @media (max-width: 1024px) {
      .content-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: 1fr; }
      .page-header h1 { font-size: 20px; }
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('weeklyChart') chartRef!: ElementRef<HTMLCanvasElement>;
  holidays: Holiday[] = [];
  loading = true;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.holidays = this.mockData.getHolidays();
      this.loading = false;
    }, 800);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.createChart(), 900);
  }

  createChart(): void {
    if (!this.chartRef) return;
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;
    const hours = this.mockData.getWeeklyHours();
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Working Hours',
          data: hours,
          backgroundColor: hours.map(h => h >= 8 ? 'rgba(39,174,96,0.7)' : h > 0 ? 'rgba(243,156,18,0.7)' : 'rgba(189,195,199,0.3)'),
          borderColor: hours.map(h => h >= 8 ? '#27ae60' : h > 0 ? '#f39c12' : '#bdc3c7'),
          borderWidth: 2,
          borderRadius: 8,
          barThickness: 36,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#2c3e50',
            titleFont: { size: 13 },
            bodyFont: { size: 12 },
            cornerRadius: 8,
            padding: 12,
            callbacks: { label: (ctx) => `${ctx.parsed.y} hours` }
          }
        },
        scales: {
          y: {
            beginAtZero: true, max: 12,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { size: 12 }, color: '#7f8c8d', stepSize: 2 }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 13, weight: 'bold' as const }, color: '#2c3e50' }
          }
        }
      }
    });
  }
}
