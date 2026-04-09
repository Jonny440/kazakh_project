export interface User {
  id: number;
  name: string;
  role: 'student' | 'company';
}

export interface CV {
  id?: number;
  full_name: string;
  expected_salary: number;
  about_me: string;
  university_name: string;
  gpa: number;
  skills: string;
  experience?: string;
  phone: string;
  email: string;
}

export interface Vacancy {
  id?: number;
  title: string;
  salary: number;
  city: string;
  employment_type: 'full_time' | 'part_time';
  work_format: 'remote' | 'onsite';
  description: string;
  requirements: string;
  company_name?: string;
  created_at?: string;
}

export interface Application {
  id?: number;
  vacancy: number;
  vacancy_title?: string;
  applicant: number;
  applicant_username?: string;
  status: 'pending' | 'accepted' | 'rejected';
  applied_at?: string;
}
