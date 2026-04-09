import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Хантер Хэд</h1>
        <p class="subtitle">Кіру түрін таңдаңыз</p>

        <div class="role-buttons">
          <button
            class="role-btn student"
            [class.selected]="selectedRole() === 'student'"
            (click)="login('student')"
          >
            <span class="icon">🎓</span>
            <span class="label">Студент ретінде кіру</span>
          </button>
          <button
            class="role-btn company"
            [class.selected]="selectedRole() === 'company'"
            (click)="login('company')"
          >
            <span class="icon">🏢</span>
            <span class="label">Компания ретінде кіру</span>
          </button>
        </div>

        @if (namePrompt()) {
          <div class="name-input">
            <input
              type="text"
              [(ngModel)]="userName"
              placeholder="Атыңызды енгізіңіз"
              (keyup.enter)="submitLogin()"
            >
            <button class="btn-primary" (click)="submitLogin()">Жалғастыру</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .login-card {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
      max-width: 500px;
      width: 90%;
    }
    h1 {
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #6b7280;
      margin-bottom: 2rem;
    }
    .role-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .role-btn {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      background: white;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 1.1rem;
    }
    .role-btn:hover {
      border-color: #2563eb;
      background: #eff6ff;
    }
    .role-btn.selected {
      border-color: #2563eb;
      background: #eff6ff;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
    .role-btn .icon {
      font-size: 2rem;
    }
    .role-btn .label {
      font-weight: 600;
      color: #1f2937;
    }
    .name-input {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .name-input input {
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
    }
    .name-input input:focus {
      outline: none;
      border-color: #2563eb;
    }
    .btn-primary {
      padding: 1rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  namePrompt = signal(false);
  selectedRole = signal('');
  userName = '';

  login(role: string) {
    this.selectedRole.set(role);
    this.namePrompt.set(true);
  }

  submitLogin() {
    if (!this.userName.trim()) return;

    const mockUser: User = {
      id: 1,
      name: this.userName.trim(),
      role: this.selectedRole() as 'student' | 'company'
    };
    this.auth.setUser(mockUser);
    this.router.navigate(['/vacancies']);
  }
}
