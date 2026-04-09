import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CV, Vacancy, Application } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Auth
  login(role: string, name: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login/`, { role, name });
  }

  // Vacancies
  getVacancies(params?: {
    search?: string;
    city?: string;
    employment_type?: string;
    work_format?: string;
    salary_min?: number;
    salary_max?: number;
  }): Observable<Vacancy[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<Vacancy[]>(`${this.apiUrl}/vacancies/`, { params: httpParams });
  }

  getVacancy(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiUrl}/vacancies/${id}/`);
  }

  createVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.apiUrl}/vacancies/`, vacancy);
  }

  updateVacancy(id: number, vacancy: Vacancy): Observable<Vacancy> {
    return this.http.put<Vacancy>(`${this.apiUrl}/vacancies/${id}/`, vacancy);
  }

  deleteVacancy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vacancies/${id}/`);
  }

  // CV
  getMyCV(): Observable<CV> {
    return this.http.get<CV>(`${this.apiUrl}/cvs/my_cv/`);
  }

  updateCV(cv: CV): Observable<CV> {
    return this.http.post<CV>(`${this.apiUrl}/cvs/update_my_cv/`, cv);
  }

  // Applications
  apply(vacancyId: number): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/applications/`, { vacancy: vacancyId });
  }

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications/my_applications/`);
  }

  getVacancyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications/my_vacancy_applications/`);
  }
}
