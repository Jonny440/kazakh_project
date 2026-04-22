import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/">ХантерХэд</a>
      </div>
      <div class="nav-links">
        <a routerLink="/vacancies" routerLinkActive="active">Бос орындар</a>
        <a routerLink="/about" routerLinkActive="active">Біз туралы</a>
        <a routerLink="/why" routerLinkActive="active">Неге біз?</a>
      </div>
      <div class="nav-actions">
        @if (authService.isLoggedIn()) {
          @if (authService.isStudent()) {
            <a routerLink="/cv" class="btn btn-outline">Түйіндеме</a>
          }
          @if (authService.isCompany()) {
            <a routerLink="/vacancy-form" class="btn btn-primary">Бос орын құру</a>
          }
          <button (click)="logout()" class="btn btn-outline">Шығу</button>
        } @else {
          <a routerLink="/login" class="btn btn-primary">Кіру</a>
        }
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-brand a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2563eb;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    .nav-links a {
      color: #374151;
      text-decoration: none;
      font-weight: 500;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #2563eb;
    }
    .nav-actions {
      display: flex;
      gap: 1rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      border: none;
    }
    .btn-primary {
      background: #2563eb;
      color: white;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
    .btn-outline {
      border: 1px solid #2563eb;
      color: #2563eb;
      background: transparent;
    }
    .btn-outline:hover {
      background: #eff6ff;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
