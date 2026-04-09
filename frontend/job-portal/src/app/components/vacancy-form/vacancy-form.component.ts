import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Vacancy } from '../../models/models';

@Component({
  selector: 'app-vacancy-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <div class="form-card">
        <h2>Бос орын құру</h2>

        <form (ngSubmit)="submitForm()">
          <div class="form-group">
            <label>Жұмыс атауы</label>
            <input type="text" [(ngModel)]="vacancy.title" name="title" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Жалақы (₸)</label>
              <input type="number" [(ngModel)]="vacancy.salary" name="salary" required>
            </div>
            <div class="form-group">
              <label>Қала</label>
              <input type="text" [(ngModel)]="vacancy.city" name="city" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Жұмыс түрі</label>
              <select [(ngModel)]="vacancy.employment_type" name="employment_type" required>
                <option value="full_time">Толық уақыт</option>
                <option value="part_time">Жартылай уақыт</option>
              </select>
            </div>
            <div class="form-group">
              <label>Жұмыс форматы</label>
              <select [(ngModel)]="vacancy.work_format" name="work_format" required>
                <option value="remote">Қашықтан</option>
                <option value="onsite">Офисте</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Сипаттама</label>
            <textarea [(ngModel)]="vacancy.description" name="description" rows="4" required></textarea>
          </div>

          <div class="form-group">
            <label>Талаптар</label>
            <textarea [(ngModel)]="vacancy.requirements" name="requirements" rows="4" required></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" (click)="cancel()">Болдырмау</button>
            <button type="submit" class="btn-submit" [disabled]="loading()">
              {{ loading() ? 'Сақталуда...' : 'Құру' }}
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
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.95rem;
      font-family: inherit;
    }
    .form-group input:focus,
    .form-group select:focus,
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
export class VacancyFormComponent {
  private dataService = inject(DataService);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);

  vacancy: Partial<Vacancy> = {
    title: '',
    salary: 0,
    city: '',
    employment_type: 'full_time',
    work_format: 'remote',
    description: '',
    requirements: '',
    company_name: this.auth.isCompany() ? 'Сіздің компания' : ''
  };

  submitForm() {
    if (!this.vacancy.title || !this.vacancy.salary || !this.vacancy.city) {
      return;
    }

    this.loading.set(true);
    setTimeout(() => {
      this.dataService.addVacancy(this.vacancy as Vacancy);
      this.loading.set(false);
      this.router.navigate(['/vacancies']);
    }, 300);
  }

  cancel() {
    this.router.navigate(['/vacancies']);
  }
}
