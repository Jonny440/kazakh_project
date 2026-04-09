import { Injectable, signal } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  get user() {
    return this.currentUser.asReadonly();
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  isStudent(): boolean {
    return this.currentUser()?.role === 'student';
  }

  isCompany(): boolean {
    return this.currentUser()?.role === 'company';
  }

  setUser(user: User) {
    this.currentUser.set(user);
  }

  logout() {
    this.currentUser.set(null);
  }
}
