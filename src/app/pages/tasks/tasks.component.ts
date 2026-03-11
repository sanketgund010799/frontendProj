import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService, Task } from '../../services/mock-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  template: `
    <app-loader [loading]="loading" message="Loading Tasks..."></app-loader>
    <div class="tasks-page" *ngIf="!loading">
      <div class="page-header">
        <div>
          <h1>Tasks</h1>
          <p>Manage your daily tasks</p>
        </div>
        <button class="btn btn-primary" (click)="showModal = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Task
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
                <th>Date</th>
                <th>Project</th>
                <th>Task</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Task Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let task of filteredTasks; let i = index">
                <td>{{ i + 1 }}</td>
                <td>{{ task.date }}</td>
                <td><span class="badge badge-primary">{{ task.projectName }}</span></td>
                <td>{{ task.task }}</td>
                <td>{{ task.startTime }}</td>
                <td>{{ task.endTime }}</td>
                <td><span class="badge badge-info">{{ task.taskTime }}</span></td>
                <td>
                  <div class="action-btns" *ngIf="isToday(task.date)">
                    <button class="btn-icon" style="background:#fff3cd;color:#f39c12;" title="Edit" (click)="editTask(task)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn-icon" style="background:#f8d7da;color:#e74c3c;" title="Delete" (click)="deleteTask(task)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                  <span *ngIf="!isToday(task.date)" class="text-muted">--</span>
                </td>
              </tr>
              <tr *ngIf="filteredTasks.length === 0">
                <td colspan="8" style="text-align:center;padding:40px;color:var(--text-secondary);">No tasks found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Task Modal -->
      <div class="modal-overlay" *ngIf="showModal" (click)="showModal = false">
        <div class="modal-content" style="max-width:700px;" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ editingTask ? 'Edit Task' : 'Add Task' }}</h3>
            <button class="modal-close" (click)="closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div *ngFor="let entry of taskEntries; let i = index" class="task-entry" [class.mt-16]="i > 0">
              <div class="task-entry-header" *ngIf="taskEntries.length > 1">
                <span class="task-entry-num">Task {{ i + 1 }}</span>
                <button class="btn-icon" style="background:#f8d7da;color:#e74c3c;" (click)="removeTaskEntry(i)" *ngIf="taskEntries.length > 1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div class="form-group">
                <label>Project</label>
                <select class="form-control" [(ngModel)]="entry.projectName">
                  <option value="">Select Project</option>
                  <option value="HR Management System">HR Management System</option>
                  <option value="E-Commerce Platform">E-Commerce Platform</option>
                  <option value="Mobile Banking App">Mobile Banking App</option>
                  <option value="Data Analytics Dashboard">Data Analytics Dashboard</option>
                  <option value="CRM System">CRM System</option>
                  <option value="Cloud Migration">Cloud Migration</option>
                </select>
              </div>
              <div class="form-group">
                <label>Date</label>
                <input type="date" class="form-control" [(ngModel)]="entry.date">
              </div>
              <div class="form-group">
                <label>Task Description</label>
                <textarea class="form-control" [(ngModel)]="entry.task" rows="3" placeholder="Describe the task..."></textarea>
              </div>
              <div class="form-row-3">
                <div class="form-group">
                  <label>Start Time</label>
                  <input type="time" class="form-control" [(ngModel)]="entry.startTime" (change)="autoPeriod(entry)">
                </div>
                <div class="form-group">
                  <label>End Time</label>
                  <input type="time" class="form-control" [(ngModel)]="entry.endTime">
                </div>
                <div class="form-group">
                  <label>Period</label>
                  <input type="text" class="form-control" [(ngModel)]="entry.period" readonly>
                </div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm add-more-btn" (click)="addTaskEntry()" *ngIf="!editingTask">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Another Task
            </button>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="closeModal()">Cancel</button>
            <button class="btn btn-primary" (click)="saveTasks()">{{ editingTask ? 'Update' : 'Save Tasks' }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tasks-page { animation: fadeIn 0.3s ease; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .page-header p { color: var(--text-secondary); font-size: 14px; }
    .filters { margin-bottom: 20px; }
    .filter-row { display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap; }
    .filter-item { flex: 1; min-width: 180px; }
    .filter-item label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); }
    .filter-actions { display: flex; align-items: flex-end; padding-bottom: 2px; }
    .action-btns { display: flex; gap: 8px; }
    .text-muted { color: var(--text-muted); font-size: 13px; }
    .task-entry { padding: 16px; background: var(--bg-main); border-radius: var(--radius-sm); }
    .task-entry.mt-16 { margin-top: 16px; }
    .task-entry-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .task-entry-num { font-size: 14px; font-weight: 600; color: var(--primary); }
    .form-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .add-more-btn { margin-top: 16px; }

    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
      .filter-row { flex-direction: column; }
      .filter-item { min-width: 100%; }
      .form-row-3 { grid-template-columns: 1fr; }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class TasksComponent implements OnInit {
  loading = true;
  showModal = false;
  editingTask: Task | null = null;
  tasks: Task[] = [];
  filterFrom = '';
  filterTo = '';
  today = new Date().toISOString().split('T')[0];

  taskEntries: { projectName: string; date: string; task: string; startTime: string; endTime: string; period: string }[] = [];

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.filterFrom = this.today;
    this.filterTo = this.today;
    setTimeout(() => {
      this.tasks = this.mockData.getTasks();
      this.loading = false;
    }, 600);
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter(t => {
      if (this.filterFrom && t.date < this.filterFrom) return false;
      if (this.filterTo && t.date > this.filterTo) return false;
      return true;
    });
  }

  isToday(date: string): boolean {
    return date === this.today;
  }

  clearFilters(): void {
    this.filterFrom = '';
    this.filterTo = '';
  }

  editTask(task: Task): void {
    this.editingTask = task;
    this.taskEntries = [{
      projectName: task.projectName,
      date: task.date,
      task: task.task,
      startTime: task.startTime,
      endTime: task.endTime,
      period: task.period
    }];
    this.showModal = true;
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  addTaskEntry(): void {
    this.taskEntries.push({ projectName: '', date: this.today, task: '', startTime: '09:00', endTime: '10:00', period: 'Morning' });
  }

  removeTaskEntry(index: number): void {
    this.taskEntries.splice(index, 1);
  }

  autoPeriod(entry: { startTime: string; period: string }): void {
    const hour = parseInt(entry.startTime.split(':')[0], 10);
    if (hour < 12) entry.period = 'Morning';
    else if (hour < 17) entry.period = 'Afternoon';
    else entry.period = 'Evening';
  }

  closeModal(): void {
    this.showModal = false;
    this.editingTask = null;
    this.taskEntries = [];
  }

  saveTasks(): void {
    if (this.editingTask) {
      const entry = this.taskEntries[0];
      this.editingTask.projectName = entry.projectName;
      this.editingTask.date = entry.date;
      this.editingTask.task = entry.task;
      this.editingTask.startTime = entry.startTime;
      this.editingTask.endTime = entry.endTime;
      this.editingTask.period = entry.period as Task['period'];
    } else {
      for (const entry of this.taskEntries) {
        if (entry.projectName && entry.task) {
          const startH = parseInt(entry.startTime.split(':')[0], 10);
          const startM = parseInt(entry.startTime.split(':')[1], 10);
          const endH = parseInt(entry.endTime.split(':')[0], 10);
          const endM = parseInt(entry.endTime.split(':')[1], 10);
          const diffMin = (endH * 60 + endM) - (startH * 60 + startM);
          const hours = Math.floor(diffMin / 60);
          const mins = diffMin % 60;
          this.tasks.push({
            no: this.tasks.length + 1,
            date: entry.date,
            projectName: entry.projectName,
            task: entry.task,
            startTime: entry.startTime,
            endTime: entry.endTime,
            taskTime: `${hours}h ${mins.toString().padStart(2, '0')}m`,
            period: entry.period as Task['period']
          });
        }
      }
    }
    this.closeModal();
  }
}
