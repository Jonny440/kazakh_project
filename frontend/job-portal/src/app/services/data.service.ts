import { Injectable, signal } from '@angular/core';
import { Vacancy, CV } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private vacanciesSignal = signal<Vacancy[]>([
    {
      id: 1,
      title: 'Frontend Developer',
      salary: 600000,
      city: 'Алматы',
      employment_type: 'full_time',
      work_format: 'onsite',
      description: 'Біздің командаға React пен TypeScript тілінде тәжіриbelі Frontend Developer қажет. Өнімді дамыту және пайдаланушы интерфейсін жақсартумен айналысасыз.',
      requirements: 'React, TypeScript, HTML/CSS, Git. 2+ жыл тәжірибе қажет.',
      company_name: 'TechVision Kazakhstan',
      created_at: '2026-03-15'
    },
    {
      id: 2,
      title: 'Backend Developer',
      salary: 550000,
      city: 'Алматы',
      employment_type: 'full_time',
      work_format: 'remote',
      description: 'Django мен Python негізінде қызметтерді әзірлеу. RESTful API құру және деректер базасымен жұмыс.',
      requirements: 'Python, Django, PostgreSQL, REST API. 1+ жыл тәжірибе.',
      company_name: 'AlmaSoft',
      created_at: '2026-03-10'
    },
    {
      id: 3,
      title: 'UI/UX Дизайнер',
      salary: 450000,
      city: 'Алматы',
      employment_type: 'full_time',
      work_format: 'onsite',
      description: 'Пайдаланушы интерфейсін жобалау және UX зерттеулері. Дизайн жүйелерін әзірлеу.',
      requirements: 'Figma, Adobe XD, UX зерттеулері. Портфолио қажет.',
      company_name: 'Digital Craft',
      created_at: '2026-03-12'
    },
    {
      id: 4,
      title: 'DevOps Инженер',
      salary: 700000,
      city: 'Астана',
      employment_type: 'full_time',
      work_format: 'remote',
      description: 'Инфрақұрылымды басқару, CI/CD құру және контейнерлеу. AWS және Kubernetes тәжірибесі.',
      requirements: 'AWS, Docker, Kubernetes, CI/CD. 3+ жыл тәжірибе.',
      company_name: 'CloudPrime',
      created_at: '2026-03-08'
    },
    {
      id: 5,
      title: 'Мәліметтер инженері',
      salary: 650000,
      city: 'Алматы',
      employment_type: 'full_time',
      work_format: 'onsite',
      description: 'Деректер құбырларын құру және ETL процестерін басқару. Big Data технологияларымен жұмыс.',
      requirements: 'Python, SQL, Apache Spark, Airflow.',
      company_name: 'DataFlow KZ',
      created_at: '2026-03-05'
    },
    {
      id: 6,
      title: 'QA Инженер',
      salary: 400000,
      city: 'Алматы',
      employment_type: 'part_time',
      work_format: 'remote',
      description: 'Автоматтандырылған тестілеу жазу және сапаны қамтамасыз ету. API тестілеу тәжірибесі.',
      requirements: 'Selenium, Postman, JavaScript. 1+ жыл тәжірибе.',
      company_name: 'TestMaster KZ',
      created_at: '2026-03-01'
    }
  ]);

  private cvsSignal = signal<CV[]>([
    {
      id: 1,
      full_name: 'Асқар Молдашев',
      expected_salary: 500000,
      about_me: 'Маған жаңа технологияларды үйрену және командамен жұмыс істеу ұнайды. Жауапкершілік пен тиімділікке басымдық беремін.',
      university_name: 'Әл-Фараби атындағы Қазақ Ұлттық Университеті',
      gpa: 3.8,
      skills: 'JavaScript, Python, React, Node.js, Git, SQL',
      experience: 'Bla Bla Studios - Frontend Developer (6 ай)',
      phone: '+7 777 123 4567',
      email: 'askar@example.com'
    }
  ]);

  getVacancies() {
    return this.vacanciesSignal;
  }

  getCVs() {
    return this.cvsSignal;
  }

  getVacancyById(id: number): Vacancy | undefined {
    return this.vacanciesSignal().find(v => v.id === id);
  }

  addVacancy(vacancy: Vacancy) {
    const current = this.vacanciesSignal();
    const newId = Math.max(...current.map(v => v.id || 0)) + 1;
    const newVacancy = { ...vacancy, id: newId, created_at: new Date().toISOString().split('T')[0] };
    this.vacanciesSignal.set([...current, newVacancy]);
    return newVacancy;
  }

  updateCV(cv: CV) {
    const current = this.cvsSignal();
    const index = current.findIndex(c => c.id === cv.id);
    if (index >= 0) {
      const updated = [...current];
      updated[index] = cv;
      this.cvsSignal.set(updated);
    } else {
      const newCV = { ...cv, id: current.length + 1 };
      this.cvsSignal.set([...current, newCV]);
    }
  }

  getCVById(id: number): CV | undefined {
    return this.cvsSignal().find(c => c.id === id);
  }
}
