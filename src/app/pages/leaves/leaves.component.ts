import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService, LeaveRecord } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Leaves..."></app-loader>
    <div class="leaves-page" *ngIf="!loading">
      <div class="page-header">
        <div>
          <h1>Leaves</h1>
          <p>Manage your leave applications</p>
        </div>
        <button class="btn btn-primary" (click)="showModal = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Leave
        </button>
      </div>

      <div class="filters card">
        <div class="filter-row">
          <div class="filter-item">
            <label>From Date</label>
            <input type="date" class="form-control" [(ngModel)]="filterFrom">
          </div>
          <div class="filter-item">
            <label>To Date</label>
            <input type="date" class="form-control" [(ngModel)]="filterTo">
          </div>
          <div class="filter-item">
            <label>Status</label>
            <select class="form-control" [(ngModel)]="filterStatus">
              <option value="">All</option>
              <option value="Applied">Applied</option>
              <option value="Approved">Approved</option>
              <option value="RejectedByAdmin">Rejected By Admin</option>
              <option value="RejectedBySystem">Rejected By System</option>
            </select>
          </div>
          <div class="filter-actions">
            <button class="btn btn-outline btn-sm" (click)="clearFilters()">Clear</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Apply Date</th>
                <th>Leave Date</th>
                <th>Leave Name</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let leave of filteredLeaves">
                <td>{{ leave.no }}</td>
                <td>{{ leave.applyDate }}</td>
                <td>{{ leave.leaveDate }}</td>
                <td>{{ leave.leaveName }}</td>
                <td>{{ leave.leaveType }}</td>
                <td>{{ leave.reason }}</td>
                <td>
                  <span class="badge" [ngClass]="getStatusBadge(leave.status)">{{ leave.status }}</span>
                </td>
                <td>
                  <button class="btn-icon" style="background: var(--primary-light); color: var(--primary);" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </td>
              </tr>
              <tr *ngIf="filteredLeaves.length === 0">
                <td colspan="8" style="text-align:center; padding:40px; color:var(--text-secondary);">No leave records found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Leave Modal -->
      <div class="modal-overlay" *ngIf="showModal" (click)="showModal = false">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Apply for Leave</h3>
            <button class="modal-close" (click)="showModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Leave Name</label>
              <select class="form-control" [(ngModel)]="newLeave.leaveName">
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
                <option value="Compensatory Off">Compensatory Off</option>
              </select>
            </div>
            <div class="form-group">
              <label>Leave Type</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="radio" name="leaveType" value="Full Day" [(ngModel)]="newLeave.leaveType"> Full Day
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="leaveType" value="Half Day" [(ngModel)]="newLeave.leaveType"> Half Day
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Leave Reason</label>
              <textarea class="form-control" [(ngModel)]="newLeave.reason" placeholder="Enter reason for leave..." rows="3"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Start Date</label>
                <input type="date" class="form-control" [(ngModel)]="newLeave.startDate">
              </div>
              <div class="form-group">
                <label>End Date</label>
                <input type="date" class="form-control" [(ngModel)]="newLeave.endDate">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="showModal = false">Cancel</button>
            <button class="btn btn-primary" (click)="applyLeave()">Apply Leave</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .leaves-page { animation: fadeIn 0.3s ease; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .filters { margin-bottom: 20px; }
    .filter-row { display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap; }
    .filter-item { flex: 1; min-width: 180px; }
    .filter-item label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); }
    .filter-actions { display: flex; align-items: flex-end; padding-bottom: 2px; }
    .checkbox-group { display: flex; gap: 20px; padding: 8px 0; }
    .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; }
    .checkbox-label input { accent-color: var(--primary); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
      .filter-row { flex-direction: column; }
      .filter-item { min-width: 100%; }
      .form-row { grid-template-columns: 1fr; }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class LeavesComponent implements OnInit {
  loading = true;
  showModal = false;
  leaves: LeaveRecord[] = [];
  filterFrom = '';
  filterTo = '';
  filterStatus = '';
  newLeave = { leaveName: '', leaveType: 'Full Day', reason: '', startDate: '', endDate: '' };

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.leaves = this.mockData.getLeaves();
      this.loading = false;
    }, 600);
  }

  get filteredLeaves(): LeaveRecord[] {
    return this.leaves.filter(l => {
      if (this.filterStatus && l.status !== this.filterStatus) return false;
      if (this.filterFrom && l.leaveDate < this.filterFrom) return false;
      if (this.filterTo && l.leaveDate > this.filterTo) return false;
      return true;
    });
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Approved': return 'badge-success';
      case 'Applied': return 'badge-warning';
      case 'RejectedByAdmin': return 'badge-danger';
      case 'RejectedBySystem': return 'badge-danger';
      default: return 'badge-info';
    }
  }

  clearFilters(): void {
    this.filterFrom = '';
    this.filterTo = '';
    this.filterStatus = '';
  }

  applyLeave(): void {
    if (this.newLeave.leaveName && this.newLeave.startDate) {
      this.leaves.unshift({
        no: this.leaves.length + 1,
        applyDate: new Date().toISOString().split('T')[0],
        leaveDate: this.newLeave.startDate,
        leaveName: this.newLeave.leaveName,
        leaveType: this.newLeave.leaveType,
        reason: this.newLeave.reason,
        status: 'Applied'
      });
      this.newLeave = { leaveName: '', leaveType: 'Full Day', reason: '', startDate: '', endDate: '' };
      this.showModal = false;
    }
  }
}
