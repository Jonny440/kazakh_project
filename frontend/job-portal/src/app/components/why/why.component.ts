import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="why-page">
      <section class="problem-section">
        <h1>Проблема</h1>
        <p class="intro">
          Қазақстандағы студенттердің басым бөлігі өз мамандығы бойынша жұмыс таба алмайды.
          Бұл олардың білімдерін тиімсіз пайдалануына және экономикалық шығындарға әкеледі.
        </p>

        <div class="statistics">
          <div class="stat-card">
            <div class="stat-number">67%</div>
            <div class="stat-label">Студенттер өз мамандығы бойынша жұмыс істемейді</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">40%</div>
            <div class="stat-label">Жұмыс берушілер білікті кадрлар таба алмайды</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">3+</div>
            <div class="stat-label">Жыл ішінде жұмыс іздеу уақыты</div>
          </div>
        </div>
      </section>

      <section class="causes-section">
        <h2>Себептері</h2>
        <div class="causes-grid">
          <div class="cause-card">
            <span class="cause-icon">🎓</span>
            <h3>Білім мен тәжірибе арасындағы алшақтық</h3>
            <p>Университеттегі білім нарық талаптарына сәйкес келмейді</p>
          </div>
          <div class="cause-card">
            <span class="cause-icon">🔍</span>
            <h3>Жұмыс табу мүмкіндіктерінің аздығы</h3>
            <p>Студенттер үшін сәйкес вакансияларды табу қиын</p>
          </div>
          <div class="cause-card">
            <span class="cause-icon">📝</span>
            <h3>CV мен жұмыс іздеу дағдыларының жоқтығы</h3>
            <p>Көпшілік өзін дұрыс презентациялай алмайды</p>
          </div>
          <div class="cause-card">
            <span class="cause-icon">🏢</span>
            <h3>Компаниялардың студенттерге деген сенімсіздігі</h3>
            <p>Жұмыс берушілер тәжірибесі жоқ жастарға сенбейді</p>
          </div>
        </div>
      </section>

      <section class="survey-section">
        <h2>Зерттеу нәтижелері</h2>
        <p class="survey-intro">
          Біз Google Forms арқылы студенттер арасында сауалнама жүргіздік.
          Нәтижелерімізді төменде қарай аласыз:
        </p>

        <div class="survey-images">
          @for (diagram of diagrams; track diagram.title) {
            <div class="diagram-card">
              <img [src]="diagram.image" [alt]="diagram.title">
              <p>{{diagram.title}}</p>
            </div>
          }
        </div>
      </section>

      <section class="solution-section">
        <h2>Біздің шешіміміз</h2>
        <p>
          Жұмыс portalı платформасы студенттер мен компанияларды біріктіреді:
        </p>
        <ul class="solution-list">
          <li>💼 Жаңадан бітірген студенттер үшін арналған арнайы вакансиялар</li>
          <li>📄 Толық CV жасау мүмкіндігі</li>
          <li>🔍 Жылдам іздеу және сүзу функциялары</li>
          <li>🏢 Компанияларға білікті студенттерді табу жеңілдейді</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .why-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1, h2 {
      color: #1f2937;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .problem-section {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      padding: 3rem;
      border-radius: 16px;
      color: white;
      margin-bottom: 3rem;
    }
    .problem-section .intro {
      font-size: 1.2rem;
      line-height: 1.6;
      max-width: 700px;
    }
    .statistics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .stat-card {
      background: rgba(255,255,255,0.15);
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
    }
    .stat-number {
      font-size: 3rem;
      font-weight: bold;
    }
    .stat-label {
      font-size: 0.95rem;
      margin-top: 0.5rem;
    }
    .causes-section {
      margin-bottom: 3rem;
    }
    .causes-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .cause-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .cause-icon {
      font-size: 3rem;
    }
    .cause-card h3 {
      color: #1f2937;
      margin: 1rem 0 0.5rem;
    }
    .cause-card p {
      color: #6b7280;
    }
    .survey-section {
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 3rem;
    }
    .survey-intro {
      text-align: center;
      color: #6b7280;
      margin-bottom: 2rem;
    }
    .survey-images {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .diagram-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      background: #f9fafb;
    }
    .diagram-card img {
      width: 100%;
      height: auto;
      object-fit: contain;
      display: block;
    }
    .diagram-card p {
      background: #f3f4f6;
      padding: 1rem;
      text-align: center;
      color: #374151;
      font-size: 0.9rem;
      margin: 0;
    }
    .solution-section {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 3rem;
      border-radius: 16px;
      color: white;
    }
    .solution-section p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
    .solution-list {
      list-style: none;
      padding: 0;
    }
    .solution-list li {
      padding: 0.75rem 0;
      font-size: 1.1rem;
    }
    @media (max-width: 768px) {
      .statistics, .causes-grid, .survey-images {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WhyComponent {
  diagrams = [
    { title: 'Сауалнама нәтижесі', image: 'diagram1.png' },
    { title: 'Статистика', image: 'diagram2.jpg' },
    { title: 'Пікірлер', image: 'diagram3.png' }
  ];
}
