import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Iniciar sesión</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required />
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email es requerido
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Introduce un email válido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input
                matInput
                formControlName="password"
                [type]="hidePassword ? 'password' : 'text'"
                required
              />
              <button
                type="button"
                mat-icon-button
                matSuffix
                (click)="hidePassword = !hidePassword"
              >
                <mat-icon>{{
                  hidePassword ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
              <mat-error
                *ngIf="loginForm.get('password')?.hasError('required')"
              >
                Contraseña es requerida
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!loginForm.valid"
              >
                Iniciar sesión
              </button>
            </div>
            <!-- Mensajes de error generales -->
            <div *ngIf="loginForm.errors" class="error-message">
              <p *ngIf="loginForm.errors['invalidCredentials']">
                Credenciales inválidas. Por favor, inténtalo de nuevo.
              </p>
              <p *ngIf="loginForm.errors['connectionError']">
                Error de conexión: {{ loginForm.errors['connectionError'] }}
              </p>
              <p *ngIf="loginForm.errors['serverError']">
                Error del servidor: {{ loginForm.errors['serverError'] }}
              </p>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions class="footer-actions">
          <a mat-button color="primary" routerLink="/register"
            >¿No tienes cuenta? Regístrate</a
          >
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 64px);
        padding: 20px;
      }
      .login-card {
        width: 100%;
        max-width: 450px;
        padding: 24px;
      }
      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }
      .actions {
        display: flex;
        justify-content: center;
        margin-top: 24px;
      }
      .footer-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      mat-card-title {
        text-align: center;
        margin-bottom: 24px;
      }
      .error-message {
        color: #f44336; /* Rojo de Material Design */
        margin: 10px 0;
        padding: 10px;
        background-color: #ffebee; /* Fondo rojo claro */
        border-radius: 4px;
      }

      .error-message p {
        margin: 5px 0;
      }
      @media (max-width: 768px) {
        .login-container {
          height: calc(100vh - 56px);
        }
      }
    `,
  ],
})
export class LoginComponent {
  hidePassword = true;
  loginForm: FormGroup;
  error: any;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          // Redirección ya manejada en el servicio
        },
        error: (error: any) => {
          this.handleLoginError(error);
        },
      });
    }
  }

  handleLoginError(error: any) {
    if (error.status === 401) {
      // Credenciales inválidas
      this.loginForm.setErrors({ invalidCredentials: true });
    } else if (error.status === 0) {
      // Error de conexión
      this.loginForm.setErrors({
        connectionError: 'No se pudo conectar al servidor',
      });
    } else {
      // Otros errores
      this.loginForm.setErrors({ serverError: 'Error en el servidor' });
    }
  }
}
