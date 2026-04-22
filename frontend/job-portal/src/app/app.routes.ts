import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { VacancyFormComponent } from './components/vacancy-form/vacancy-form.component';
import { VacancyDetailComponent } from './components/vacancy-detail/vacancy-detail.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { AboutComponent } from './components/about/about.component';
import { WhyComponent } from './components/why/why.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vacancies', component: VacanciesComponent },
  { path: 'vacancy-detail/:id', component: VacancyDetailComponent },
  { path: 'vacancy-form', component: VacancyFormComponent },
  { path: 'cv', component: CvFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'why', component: WhyComponent },
];
