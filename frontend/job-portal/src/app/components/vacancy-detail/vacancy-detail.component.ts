import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Vacancy } from '../../models/models';

@Component({
  selector: 'app-vacancy-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-page">
      @if (loading()) {
        <div class="loading">Жүктелуде...</div>
      } @else if (!vacancy()) {
        <div class="not-found">
          <h2>Бос орын табылмады</h2>
          <a routerLink="/vacancies" class="back-link">Бос орындар тізіміне оралу</a>
        </div>
      } @else {
        <div class="detail-container">
          <div class="detail-header">
            <a routerLink="/vacancies" class="back-link">← Бос орындар тізіміне оралу</a>
          </div>

          <div class="vacancy-detail-card">
            <div class="vacancy-main">
              <div class="vacancy-header">
                <h1>{{vacancy()!.title}}</h1>
                <span class="company-name">{{vacancy()!.company_name}}</span>
              </div>

              <div class="vacancy-meta">
                <div class="meta-item">
                  <span class="meta-label">Жалақы</span>
                  <span class="meta-value salary">{{vacancy()!.salary | number}} ₸</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Қала</span>
                  <span class="meta-value">{{vacancy()!.city}}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Жұмыс түрі</span>
                  <span class="meta-value">{{vacancy()!.employment_type === 'full_time' ? 'Толық уақыт' : 'Жартылай уақыт'}}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Жұмыс форматы</span>
                  <span class="meta-value">{{vacancy()!.work_format === 'remote' ? 'Қашықтан' : 'Офисте'}}</span>
                </div>
              </div>

              <div class="vacancy-section">
                <h3>Сипаттама</h3>
                <p>{{vacancy()!.description}}</p>
              </div>

              <div class="vacancy-section">
                <h3>Талаптар</h3>
                <p>{{vacancy()!.requirements}}</p>
              </div>

              <div class="vacancy-actions">
                @if (authService.isLoggedIn() && authService.isStudent()) {
                  <button class="apply-btn" (click)="apply()">Өтініш беру</button>
                } @else if (!authService.isLoggedIn()) {
                  <a routerLink="/login" class="apply-btn">Кіру үшін өтініш беру</a>
                }
              </div>
            </div>

            <div class="map-section">
              <h3>Қала картасы</h3>
              <div class="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23262.42499911595!2d76.92887!3d43.238949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836e7d16c29f6d%3A0x4ab5e3f6b1c6c3a8!2sAlmaty%2C%20Kazakhstan!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .detail-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .loading, .not-found {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }
    .not-found h2 {
      margin-bottom: 1rem;
      color: #1f2937;
    }
    .back-link {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .detail-header {
      margin-bottom: 1.5rem;
    }
    .vacancy-detail-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .vacancy-main {
      padding: 2rem;
    }
    .vacancy-header {
      margin-bottom: 1.5rem;
    }
    .vacancy-header h1 {
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    .company-name {
      color: #6b7280;
      font-size: 1.1rem;
    }
    .vacancy-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .meta-label {
      color: #6b7280;
      font-size: 0.85rem;
    }
    .meta-value {
      color: #1f2937;
      font-weight: 600;
    }
    .meta-value.salary {
      color: #059669;
      font-size: 1.1rem;
    }
    .vacancy-section {
      margin-bottom: 1.5rem;
    }
    .vacancy-section h3 {
      color: #1f2937;
      margin-bottom: 0.75rem;
    }
    .vacancy-section p {
      color: #4b5563;
      line-height: 1.7;
    }
    .vacancy-actions {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }
    .apply-btn {
      display: inline-block;
      padding: 0.875rem 2rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
    }
    .apply-btn:hover {
      background: #1d4ed8;
    }
    .map-section {
      padding: 2rem;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    .map-section h3 {
      color: #1f2937;
      margin-bottom: 1rem;
    }
    .map-container {
      border-radius: 8px;
      overflow: hidden;
      background: #e5e7eb;
    }
  `]
})
export class VacancyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  authService = inject(AuthService);

  vacancy = signal<Vacancy | null>(null);
  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.dataService.getVacancyById(id);
    if (found) {
      this.vacancy.set(found);
    }
    this.loading.set(false);
  }

  apply() {
    alert('Өтініш сәтті жіберілді!');
  }
}
