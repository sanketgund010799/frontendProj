import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="app-layout" [class.sidebar-collapsed]="sidebarCollapsed">
      <app-sidebar
        [collapsed]="sidebarCollapsed"
        [mobileOpen]="mobileMenuOpen"
        (collapsedChange)="sidebarCollapsed = $event"
        (mobileOpenChange)="mobileMenuOpen = $event">
      </app-sidebar>
      <div class="main-area">
        <app-topbar (menuToggle)="mobileMenuOpen = !mobileMenuOpen"></app-topbar>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-layout { display: flex; height: 100vh; overflow: hidden; }
    .main-area {
      flex: 1; display: flex; flex-direction: column;
      margin-left: 260px; transition: margin-left 0.3s ease;
      height: 100vh; overflow: hidden;
    }
    .sidebar-collapsed .main-area { margin-left: 72px; }
    .main-content { flex: 1; overflow-y: auto; padding: 24px; }
    @media (max-width: 768px) {
      .main-area { margin-left: 0 !important; }
      .main-content { padding: 16px; }
    }
  `]
})
export class AppComponent {
  sidebarCollapsed = false;
  mobileMenuOpen = false;
}
