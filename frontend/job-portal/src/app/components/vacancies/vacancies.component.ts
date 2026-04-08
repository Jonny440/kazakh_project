import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Vacancy } from '../../models/models';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="vacancies-page">
      <aside class="filters">
        <h3>Сүзгілер</h3>

        <div class="filter-group">
          <label>Іздеу</label>
          <input
            type="text"
            [(ngModel)]="filters.search"
            (ngModelChange)="applyFilters()"
            placeholder="Жұмыс атауы немесе компания..."
          >
        </div>

        <div class="filter-group">
          <label>Қала</label>
          <input
            type="text"
            [(ngModel)]="filters.city"
            (ngModelChange)="applyFilters()"
            placeholder="Қала..."
          >
        </div>

        <div class="filter-group">
          <label>Жалақы (₸)</label>
          <div class="salary-range">
            <input
              type="number"
              [(ngModel)]="filters.salary_min"
              (ngModelChange)="applyFilters()"
              placeholder="Мин"
            >
            <span>-</span>
            <input
              type="number"
              [(ngModel)]="filters.salary_max"
              (ngModelChange)="applyFilters()"
              placeholder="Макс"
            >
          </div>
        </div>

        <div class="filter-group">
          <label>Жұмыс түрі</label>
          <select [(ngModel)]="filters.employment_type" (ngModelChange)="applyFilters()">
            <option value="">Барлығы</option>
            <option value="full_time">Толық уақыт</option>
            <option value="part_time">Жартылай уақыт</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Жұмыс форматы</label>
          <select [(ngModel)]="filters.work_format" (ngModelChange)="applyFilters()">
            <option value="">Барлығы</option>
            <option value="remote">Қашықтан</option>
            <option value="onsite">Офисте</option>
          </select>
        </div>

        <button class="reset-btn" (click)="resetFilters()">Сүзгілерді тазалау</button>
      </aside>

      <main class="vacancies-list">
        <div class="vacancies-header">
          <h2>Бос орындар ({{filteredVacancies().length}})</h2>
        </div>

        @if (filteredVacancies().length === 0) {
          <div class="empty">Бос орындар табылмады</div>
        } @else {
          <div class="vacancy-grid">
            @for (vacancy of filteredVacancies(); track vacancy.id) {
              <div class="vacancy-card" [routerLink]="['/vacancy-detail', vacancy.id]">
                <div class="vacancy-header">
                  <h3>{{vacancy.title}}</h3>
                  <span class="company">{{vacancy.company_name}}</span>
                </div>
                <div class="vacancy-info">
                  <span class="salary">{{vacancy.salary | number}} ₸</span>
                  <span class="city">📍 {{vacancy.city}}</span>
                </div>
                <div class="vacancy-tags">
                  <span class="tag">{{vacancy.employment_type === 'full_time' ? 'Толық уақыт' : 'Жартылай уақыт'}}</span>
                  <span class="tag">{{vacancy.work_format === 'remote' ? 'Қашықтан' : 'Офисте'}}</span>
                </div>
                <p class="description">{{vacancy.description}}</p>
              </div>
            }
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .vacancies-page {
      display: flex;
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    .filters {
      width: 280px;
      flex-shrink: 0;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      height: fit-content;
    }
    .filters h3 {
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
    .filter-group {
      margin-bottom: 1.25rem;
    }
    .filter-group label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    .filter-group input, .filter-group select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.95rem;
    }
    .filter-group input:focus, .filter-group select:focus {
      outline: none;
      border-color: #2563eb;
    }
    .salary-range {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .salary-range input {
      flex: 1;
    }
    .reset-btn {
      width: 100%;
      padding: 0.75rem;
      background: #f3f4f6;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }
    .reset-btn:hover {
      background: #e5e7eb;
    }
    .vacancies-list {
      flex: 1;
    }
    .vacancies-header {
      margin-bottom: 1.5rem;
    }
    .vacancy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1.5rem;
    }
    .vacancy-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }
    .vacancy-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .vacancy-header h3 {
      color: #1f2937;
      margin-bottom: 0.25rem;
    }
    .vacancy-header .company {
      color: #6b7280;
      font-size: 0.9rem;
    }
    .vacancy-info {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      color: #374151;
    }
    .salary {
      font-weight: 600;
      color: #059669;
    }
    .vacancy-tags {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .tag {
      padding: 0.25rem 0.75rem;
      background: #eff6ff;
      color: #2563eb;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    .description {
      color: #6b7280;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    .loading, .empty {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }
  `]
})
export class VacanciesComponent implements OnInit {
  private dataService = inject(DataService);
  authService = inject(AuthService);

  vacancies = signal<Vacancy[]>([]);
  filteredVacancies = signal<Vacancy[]>([]);

  filters = {
    search: '',
    city: '',
    employment_type: '',
    work_format: '',
    salary_min: null as number | null,
    salary_max: null as number | null
  };

  ngOnInit() {
    this.vacancies.set(this.dataService.getVacancies()());
    this.applyFilters();
  }

  applyFilters() {
    const all = this.vacancies();
    const result = all.filter(v => {
      if (this.filters.search) {
        const search = this.filters.search.toLowerCase();
        if (!v.title.toLowerCase().includes(search) && !v.company_name?.toLowerCase().includes(search)) {
          return false;
        }
      }
      if (this.filters.city && v.city.toLowerCase() !== this.filters.city.toLowerCase()) {
        return false;
      }
      if (this.filters.employment_type && v.employment_type !== this.filters.employment_type) {
        return false;
      }
      if (this.filters.work_format && v.work_format !== this.filters.work_format) {
        return false;
      }
      if (this.filters.salary_min && v.salary < this.filters.salary_min) {
        return false;
      }
      if (this.filters.salary_max && v.salary > this.filters.salary_max) {
        return false;
      }
      return true;
    });
    this.filteredVacancies.set(result);
  }

  resetFilters() {
    this.filters = {
      search: '',
      city: '',
      employment_type: '',
      work_format: '',
      salary_min: null,
      salary_max: null
    };
    this.applyFilters();
  }
}
