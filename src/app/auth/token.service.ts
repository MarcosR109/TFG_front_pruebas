import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  saveRole(role: number) {
    localStorage.setItem('role', role.toString());
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getRole(): number {
    return parseInt(localStorage.getItem('role') || '1', 10);
  }
  deleteRole() {
    localStorage.removeItem('role');
  }
}
