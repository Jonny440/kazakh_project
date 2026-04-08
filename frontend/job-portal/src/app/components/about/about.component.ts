import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-page">
      <section class="hero">
        <h1>Біз туралы</h1>
        <p class="hero-text">
          Хантер хэд — бұл студенттер мен жұмыс берушілерді біріктіретін платформа.
          Біз студенттерге өз мамандығы бойынша жұмыс табуға көмектесеміз.
        </p>
      </section>

      <section class="team">
        <h2>Біздің команда</h2>
        <div class="team-grid">
          @for (member of team; track member.name) {
            <div class="team-card">
              <div class="photo">
                <img [src]="member.photo" [alt]="member.name">
              </div>
              <h3>{{member.name}}</h3>
              <p>{{member.role}}</p>
            </div>
          }
        </div>
      </section>

      <section class="project-info">
        <h2>Жоба туралы</h2>
        <p>
          Бұл жоба студенттердің жұмыссыздығы мәселесін шешу үшін жасалды.
          Көптеген студенттер білім алғаннан кейін өз мамандығы бойынша жұмыс таба алмайды.
        </p>
        <p>
          Біздің мақсат — студенттер мен компанияларды бір платформада біріктіру,
          жұмыс іздеуді жеңілдету және мүмкіндіктерді кеңейту.
        </p>
      </section>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .hero {
      text-align: center;
      padding: 3rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      margin-bottom: 3rem;
    }
    .hero h1 {
      color: white;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .hero-text {
      color: rgba(255,255,255,0.9);
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .team {
      margin-bottom: 3rem;
    }
    .team h2, .project-info h2 {
      text-align: center;
      color: #1f2937;
      margin-bottom: 2rem;
    }
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }
    .team-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 1rem;
      overflow: hidden;
    }
    .photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .team-card h3 {
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    .team-card p {
      color: #6b7280;
    }
    .project-info {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .project-info p {
      color: #374151;
      line-height: 1.8;
      margin-bottom: 1rem;
    }
  `]
})
export class AboutComponent {
  team = [
    { name: 'Жанiбек', role: 'Бэкэнд', photo: '/project1.jpeg' },
    { name: 'Ақжайнақ', role: 'Бағдарламалаушы', photo: '/project2.jpeg' },
    { name: 'Ғалымжомарт', role: 'UI/UX Дизайнер', photo: '/project3.jpeg' },
    { name: 'Айдана', role: 'Фронтэнд', photo: '/project4.jpeg' },
    { name: 'Дәурен', role: 'Тестілеуші', photo: '/project5.jpeg' }
  ];
}
