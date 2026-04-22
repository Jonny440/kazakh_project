import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="welcome-page">
      <div class="hero-section">
        <div class="glow"></div>
        <div class="content">
          <h1>Іс-тәжірибе тап</h1>
          <p>Сіз 3-ші немесе 4-ші курс студентісіз бе? Онда жұмыс пен іс-тәжірибе табу уақыты келді!</p>
          <div class="cta-group">
            <a routerLink="/vacancies" class="btn btn-primary">Бос орындарды қарау</a>
            <a routerLink="/login" class="btn btn-secondary">Кіру / Тіркелу</a>
          </div>
        </div>
      </div>

      <section class="features">
        <div class="feature-card">
          <span class="feature-icon">🎓</span>
          <h3>Студенттерге арналған</h3>
          <p>Жаңадан бітірген немесе білім алып жатқан студенттер үшін арнайы вакансиялар</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">💼</span>
          <h3>Оңай іздеу</h3>
          <p>Жылдам іздеу және сүзу функциялары арқылы сәйкес жұмысты табыңыз</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">📄</span>
          <h3>CV құру</h3>
          <p>Өз дағдыларыңыз бен тәжірибеңізді көрсететін жеке CV жасаңыз</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .welcome-page {
      min-height: calc(100vh - 70px);
      background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
    }
    .hero-section {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: 4rem 2rem;
      overflow: hidden;
    }
    .glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 400px;
      background: radial-gradient(ellipse, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0.1) 40%, rgba(255, 255, 255, 0) 70%);
      filter: blur(60px);
      pointer-events: none;
    }
    .content {
      position: relative;
      text-align: center;
      max-width: 700px;
    }
    h1 {
      font-size: 4rem;
      font-weight: 800;
      color: #1e3a8a;
      margin-bottom: 1.5rem;
      line-height: 1.1;
      text-shadow: 0 0 40px rgba(37, 99, 235, 0.2);
    }
    p {
      font-size: 1.4rem;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .cta-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .btn {
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.1rem;
      text-decoration: none;
      transition: all 0.3s;
    }
    .btn-primary {
      background: #2563eb;
      color: white;
    }
    .btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
    }
    .btn-secondary {
      background: white;
      color: #2563eb;
      border: 2px solid #2563eb;
    }
    .btn-secondary:hover {
      background: #eff6ff;
      transform: translateY(-2px);
    }
    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      transition: transform 0.3s;
    }
    .feature-card:hover {
      transform: translateY(-5px);
    }
    .feature-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      color: #1f2937;
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
    }
    .feature-card p {
      color: #6b7280;
      font-size: 1rem;
      margin: 0;
    }
    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }
      p {
        font-size: 1.1rem;
      }
      .features {
        grid-template-columns: 1fr;
      }
      .cta-group {
        flex-direction: column;
      }
    }
  `]
})
export class WelcomeComponent {}
