import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }
  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  saveRole(role: number) {
    sessionStorage.setItem('role', role.toString());
  }
  deleteToken() {
    sessionStorage.removeItem('token');
  }
  getRole(): number {
    return parseInt(sessionStorage.getItem('role') || '1', 10);
  }
  deleteRole() {
    sessionStorage.removeItem('role');
  }
}
