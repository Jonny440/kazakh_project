import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { CV } from '../../models/models';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <div class="form-card">
        <h2>Менің Түйіндеме</h2>

        <form (ngSubmit)="submitForm()">
          <div class="form-group">
            <label>Толық аты</label>
            <input type="text" [(ngModel)]="cv.full_name" name="full_name" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Күтілетін жалақы (₸)</label>
              <input type="number" [(ngModel)]="cv.expected_salary" name="expected_salary" required>
            </div>
            <div class="form-group">
              <label>GPA</label>
              <input type="number" step="0.01" min="0" max="4" [(ngModel)]="cv.gpa" name="gpa" required>
            </div>
          </div>

          <div class="form-group">
            <label>Мен туралы</label>
            <textarea [(ngModel)]="cv.about_me" name="about_me" rows="4" required></textarea>
          </div>

          <div class="form-group">
            <label>Университет</label>
            <input type="text" [(ngModel)]="cv.university_name" name="university_name" required>
          </div>

          <div class="form-group">
            <label>Дағдылар</label>
            <textarea [(ngModel)]="cv.skills" name="skills" rows="3" placeholder="Дағдыларды үтірмен бөліп жазыңыз" required></textarea>
          </div>

          <div class="form-group">
            <label>Тәжірибе (міндетті емес)</label>
            <textarea [(ngModel)]="cv.experience" name="experience" rows="3"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Телефон</label>
              <input type="tel" [(ngModel)]="cv.phone" name="phone" required>
            </div>
            <div class="form-group">
              <label>Электрондық пошта</label>
              <input type="email" [(ngModel)]="cv.email" name="email" required>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" (click)="cancel()">Болдырмау</button>
            <button type="submit" class="btn-submit" [disabled]="loading()">
              {{ loading() ? 'Сақталуда...' : 'Сақтау' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    .form-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 600px;
    }
    h2 {
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-group label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.95rem;
      font-family: inherit;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #2563eb;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }
    .btn-cancel {
      padding: 0.75rem 1.5rem;
      background: #f3f4f6;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-cancel:hover {
      background: #e5e7eb;
    }
    .btn-submit {
      padding: 0.75rem 1.5rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-submit:hover:not(:disabled) {
      background: #1d4ed8;
    }
    .btn-submit:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  `]
})
export class CvFormComponent implements OnInit {
  private dataService = inject(DataService);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);

  cv: CV = {
    full_name: '',
    expected_salary: 0,
    about_me: '',
    university_name: '',
    gpa: 0,
    skills: '',
    experience: '',
    phone: '',
    email: ''
  };

  ngOnInit() {
    const cvs = this.dataService.getCVs()();
    if (cvs.length > 0) {
      this.cv = { ...cvs[0] };
    }
  }

  submitForm() {
    this.loading.set(true);
    setTimeout(() => {
      this.dataService.updateCV(this.cv);
      this.loading.set(false);
      alert('CV сәтті сақталды!');
      this.router.navigate(['/vacancies']);
    }, 300);
  }

  cancel() {
    this.router.navigate(['/vacancies']);
  }
}
