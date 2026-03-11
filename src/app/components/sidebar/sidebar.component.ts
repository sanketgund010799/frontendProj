import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed" [class.mobile-open]="mobileOpen">
      <div class="sidebar-header">
        <div class="logo" *ngIf="!collapsed">
          <div class="logo-icon">HR</div>
          <span class="logo-text">HRMS Portal</span>
        </div>
        <div class="logo" *ngIf="collapsed">
          <div class="logo-icon small">HR</div>
        </div>
        <button class="toggle-btn desktop-toggle" (click)="toggleSidebar()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line *ngIf="!collapsed" x1="3" y1="6" x2="21" y2="6"/>
            <line *ngIf="!collapsed" x1="3" y1="12" x2="21" y2="12"/>
            <line *ngIf="!collapsed" x1="3" y1="18" x2="21" y2="18"/>
            <line *ngIf="collapsed" x1="3" y1="6" x2="21" y2="6"/>
            <line *ngIf="collapsed" x1="3" y1="12" x2="21" y2="12"/>
            <line *ngIf="collapsed" x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
      <nav class="sidebar-nav">
        <a *ngFor="let item of menuItems"
           [routerLink]="item.route"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: item.route === '/dashboard'}"
           class="nav-item"
           (click)="onNavClick()">
          <span class="nav-icon" [innerHTML]="item.icon"></span>
          <span class="nav-label" *ngIf="!collapsed">{{ item.label }}</span>
        </a>
      </nav>
      <div class="sidebar-footer" *ngIf="!collapsed">
        <div class="footer-info">
          <small>&copy; 2026 HRMS Portal</small>
        </div>
      </div>
    </aside>
    <div class="sidebar-backdrop" *ngIf="mobileOpen" (click)="closeMobile()"></div>
  `,
  styles: [`
    .sidebar {
      width: 260px; height: 100vh; background: linear-gradient(180deg, #1e3a5f 0%, #162d4a 100%);
      display: flex; flex-direction: column; transition: width 0.3s ease;
      position: fixed; left: 0; top: 0; z-index: 100;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }
    .sidebar.collapsed { width: 72px; }
    .sidebar-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); min-height: 64px;
    }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon {
      width: 40px; height: 40px; background: linear-gradient(135deg, #3a6b9f, #5a9fd4);
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0;
    }
    .logo-icon.small { width: 36px; height: 36px; font-size: 12px; }
    .logo-text { color: #fff; font-size: 16px; font-weight: 600; white-space: nowrap; }
    .toggle-btn {
      background: rgba(255,255,255,0.1); border: none; color: #c8d6e5;
      width: 32px; height: 32px; border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s; flex-shrink: 0;
    }
    .toggle-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
    .sidebar-nav { flex: 1; padding: 12px 8px; overflow-y: auto; }
    .nav-item {
      display: flex; align-items: center; gap: 14px;
      padding: 12px 16px; color: #c8d6e5; text-decoration: none;
      border-radius: 10px; margin-bottom: 4px; transition: all 0.2s;
      font-size: 14px; font-weight: 500; white-space: nowrap;
    }
    .nav-item:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .nav-item.active { background: rgba(58,107,159,0.5); color: #fff; font-weight: 600; }
    .nav-icon { width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .nav-icon ::ng-deep svg { width: 20px; height: 20px; }
    .nav-label { overflow: hidden; text-overflow: ellipsis; }
    .sidebar-footer { padding: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
    .footer-info small { color: rgba(255,255,255,0.4); font-size: 11px; }
    .sidebar-backdrop { display: none; }
    .collapsed .sidebar-header { justify-content: center; padding: 16px 8px; }
    .collapsed .toggle-btn { display: none; }
    .collapsed .nav-item { justify-content: center; padding: 12px; }

    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); width: 260px; }
      .sidebar.mobile-open { transform: translateX(0); }
      .sidebar.collapsed { width: 260px; }
      .desktop-toggle { display: none; }
      .sidebar-backdrop {
        display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.4); z-index: 99;
      }
    }
  `]
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() mobileOpenChange = new EventEmitter<boolean>();

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
    { label: 'Leaves', route: '/leaves', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' },
    { label: 'Attendance', route: '/attendance', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>' },
    { label: 'Calendar', route: '/calendar', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { label: 'Projects', route: '/projects', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>' },
    { label: 'Events', route: '/events', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>' },
    { label: 'Tasks', route: '/tasks', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>' },
    { label: 'Team', route: '/team', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>' },
    { label: 'Profile', route: '/profile', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  ];

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  closeMobile(): void {
    this.mobileOpen = false;
    this.mobileOpenChange.emit(false);
  }

  onNavClick(): void {
    if (window.innerWidth <= 768) {
      this.closeMobile();
    }
  }
}
