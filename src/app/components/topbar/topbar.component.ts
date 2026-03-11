import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <button class="mobile-menu-btn" (click)="menuToggle.emit()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div class="datetime-info">
          <span class="date-text">{{ currentDate }}</span>
          <span class="time-text">{{ currentTime }}</span>
        </div>
      </div>

      <div class="topbar-center">
        <button class="checkin-btn" [class.checked-in]="isCheckedIn" (click)="toggleCheckIn()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline *ngIf="!isCheckedIn" points="12,6 12,12 16,14"/>
            <polyline *ngIf="isCheckedIn" points="8,12 11,15 16,9"/>
          </svg>
          {{ isCheckedIn ? 'Check Out' : 'Check In' }}
        </button>
        <span class="checkin-time" *ngIf="isCheckedIn">Since {{ checkInTime }}</span>
      </div>

      <div class="topbar-right">
        <div class="notification-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span class="notification-dot"></span>
        </div>
        <div class="profile-dropdown" (click)="toggleDropdown($event)">
          <div class="profile-avatar">SG</div>
          <div class="profile-info">
            <span class="profile-name">Sanket Gund</span>
            <span class="profile-role">Software Engineer</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron" [class.open]="dropdownOpen">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          <div class="dropdown-menu" *ngIf="dropdownOpen" (click)="$event.stopPropagation()">
            <a routerLink="/profile" class="dropdown-item" (click)="dropdownOpen = false">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profile
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item logout" (click)="dropdownOpen = false">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: 64px; background: #fff; display: flex; align-items: center;
      justify-content: space-between; padding: 0 24px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06); position: sticky; top: 0; z-index: 50;
    }
    .topbar-left { display: flex; align-items: center; gap: 16px; }
    .mobile-menu-btn {
      display: none; background: none; border: none; cursor: pointer;
      color: var(--text-primary); padding: 4px;
    }
    .datetime-info { display: flex; flex-direction: column; }
    .date-text { font-size: 14px; font-weight: 600; color: var(--text-primary); }
    .time-text { font-size: 12px; color: var(--text-secondary); }
    .topbar-center { display: flex; align-items: center; gap: 12px; }
    .checkin-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 24px; border: none; border-radius: 25px;
      font-family: inherit; font-size: 14px; font-weight: 600;
      cursor: pointer; transition: all 0.3s;
      background: linear-gradient(135deg, #27ae60, #2ecc71); color: #fff;
      box-shadow: 0 4px 12px rgba(39,174,96,0.3);
    }
    .checkin-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(39,174,96,0.4); }
    .checkin-btn.checked-in {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      box-shadow: 0 4px 12px rgba(231,76,60,0.3);
    }
    .checkin-btn.checked-in:hover { box-shadow: 0 6px 16px rgba(231,76,60,0.4); }
    .checkin-time { font-size: 12px; color: var(--text-secondary); }
    .topbar-right { display: flex; align-items: center; gap: 16px; }
    .notification-btn {
      position: relative; cursor: pointer; padding: 8px;
      border-radius: 8px; transition: background 0.2s; color: var(--text-secondary);
    }
    .notification-btn:hover { background: var(--bg-main); }
    .notification-dot {
      position: absolute; top: 6px; right: 6px; width: 8px; height: 8px;
      background: #e74c3c; border-radius: 50%; border: 2px solid #fff;
    }
    .profile-dropdown {
      display: flex; align-items: center; gap: 10px; cursor: pointer;
      padding: 6px 12px; border-radius: 10px; transition: background 0.2s;
      position: relative;
    }
    .profile-dropdown:hover { background: var(--bg-main); }
    .profile-avatar {
      width: 38px; height: 38px; border-radius: 10px;
      background: linear-gradient(135deg, #3a6b9f, #5a9fd4);
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 600; font-size: 13px; flex-shrink: 0;
    }
    .profile-info { display: flex; flex-direction: column; }
    .profile-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
    .profile-role { font-size: 11px; color: var(--text-secondary); }
    .chevron { transition: transform 0.2s; color: var(--text-secondary); }
    .chevron.open { transform: rotate(180deg); }
    .dropdown-menu {
      position: absolute; top: calc(100% + 8px); right: 0;
      background: #fff; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      min-width: 200px; overflow: hidden; z-index: 100;
      animation: slideUp 0.2s ease;
    }
    .dropdown-item {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 16px; color: var(--text-primary); text-decoration: none;
      font-size: 14px; transition: background 0.2s; cursor: pointer;
    }
    .dropdown-item:hover { background: var(--bg-main); }
    .dropdown-item.logout { color: var(--danger); }
    .dropdown-divider { height: 1px; background: var(--border); margin: 4px 0; }

    @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 768px) {
      .topbar { padding: 0 16px; }
      .mobile-menu-btn { display: flex; }
      .profile-info { display: none; }
      .checkin-time { display: none; }
      .datetime-info .date-text { font-size: 12px; }
      .datetime-info .time-text { font-size: 11px; }
      .checkin-btn { padding: 8px 16px; font-size: 12px; }
    }
    @media (max-width: 480px) {
      .topbar { padding: 0 12px; gap: 8px; }
      .topbar-center { flex: 0; }
    }
  `]
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  currentDate = '';
  currentTime = '';
  isCheckedIn = false;
  checkInTime = '';
  dropdownOpen = false;
  private timer: ReturnType<typeof setInterval> | null = null;
  private clickListener: ((e: Event) => void) | null = null;

  ngOnInit(): void {
    this.updateDateTime();
    this.timer = setInterval(() => this.updateDateTime(), 1000);
    this.clickListener = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        this.dropdownOpen = false;
      }
    };
    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    if (this.clickListener) document.removeEventListener('click', this.clickListener);
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  toggleCheckIn(): void {
    this.isCheckedIn = !this.isCheckedIn;
    if (this.isCheckedIn) {
      this.checkInTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }
}
