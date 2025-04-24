import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { CancionService } from '../cancion.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private cancionService: CancionService
  ) {
    this.API_URL = this.cancionService.URL;
    this.iniciarEstados();
  }
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus = this.isAuthenticated.asObservable();
  private role = new BehaviorSubject<number>(1);
  $role = this.role.asObservable();
  API_URL = '';
  iniciarEstados() {
    const token = this.tokenService.getToken();
    if (token) {
      this.isAuthenticated.next(true);
      this.role.next(this.tokenService.getRole());
    }
  }

  register(user: FormData) {
    this.http.post(`${this.API_URL}register`, user).subscribe(
      (response) => {
        //this.isAuthenticated.next(true);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }

  login(user: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}login`, user).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRole(response.role);
          this.isAuthenticated.next(true);
          this.role.next(response.role);
        }
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        return throwError(() => error); // Re-lanzamos el error para que lo capture el componente
      })
    );
  }

  logout() {
    this.http.get(`${this.API_URL}logout`).subscribe(
      (response) => {
        this.isAuthenticated.next(false);
        this.role.next(1);
        this.tokenService.deleteToken();
        this.tokenService.deleteRole();
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
}
