import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { passwordMatchValidator } from '../passwordmatch.service';
@Component({
  selector: 'app-register',
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
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Crear cuenta</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="name" required />
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="registerForm.get('name')?.hasError('required')">
                Nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required />
              <mat-icon matSuffix>email</mat-icon>
              <mat-error
                *ngIf="registerForm.get('email')?.hasError('required')"
              >
                Email es requerido
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
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
                *ngIf="registerForm.get('password')?.hasError('required')"
              >
                Contraseña es requerida
              </mat-error>
              <mat-error
                *ngIf="registerForm.get('password')?.hasError('minlength')"
              >
                Mínimo 8 caracteres
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirmar contraseña</mat-label>
              <input
                matInput
                formControlName="confirmPassword"
                [type]="hideConfirmPassword ? 'password' : 'text'"
                required
              />
              <button
                type="button"
                mat-icon-button
                matSuffix
                (click)="hideConfirmPassword = !hideConfirmPassword"
              >
                <mat-icon>{{
                  hideConfirmPassword ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
              <mat-error
                *ngIf="
                  registerForm.get('confirmPassword')?.hasError('required')
                "
              >
                Confirma tu contraseña
              </mat-error>
              <mat-error *ngIf="registerForm.hasError('passwordMismatch')">
                Las contraseñas no coinciden
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [class]="registerForm.valid ? 'primary' : 'disabled'"
                [disabled]="!registerForm.valid"
              >
                Registrarse
              </button>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions class="footer-actions">
          <a mat-button style="color:rgba(31, 53, 88, 0.9)" routerLink="/login"
            >¿Ya tienes cuenta? Inicia sesión</a
          >
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 64px);
        padding: 20px;
      }
      .register-card {
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
      .primary {
        background-color: #a6c5f3;
        color: black;
      }
      @media (max-width: 768px) {
        .register-container {
          height: calc(100vh - 56px);
        }
      }
    `,
  ],
})
export class RegisterComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }
  ngOnInit() {
    // Escucha cambios en los campos de contraseña
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }
  onSubmit() {
    if (
      this.registerForm.valid &&
      !this.registerForm.hasError('passwordMismatch')
    ) {
      this.auth.register(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
