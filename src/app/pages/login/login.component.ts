import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  errorMsg: { input: string; message: string } | null = null;
  loading = false;

  protected authForm = this.fb.group({
    emailOrCpf: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });

  login() {
    if (!this.authForm.valid) {
      this.authForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    this.errorMsg = null;
    
    const authData = this.authForm.value;

    this.authService
      .auth(authData as { emailOrCpf: string; pass: string })
      .then((response) => {
        console.log('Login bem-sucedido:', response);
        this.loading = false;
      })
      .catch((error: HttpErrorResponse) => {
        console.error('Erro de login:', error);
        this.loading = false;
        
        if (error.status === 403) {
          this.errorMsg = {
            input: 'user',
            message: 'Seu acesso ainda não foi aprovado. Aguarde a aprovação.'
          };
        } else {
          this.showError(error.error?.message || 'Erro ao fazer login');
        }
      });
  }

  showError(errorMsg: string) {
    const error: { [key: string]: any } = {
      'Usuário não encontrado.': {
        input: 'user',
        message: 'Usuário não encontrado!',
      },
      'Senha incorreta.': { input: 'pass', message: 'Senha incorreta!' },
      'Seu acesso ainda não foi aprovado. Aguarde a aprovação.': {
        input: 'user',
        message: 'Seu acesso ainda não foi aprovado. Aguarde a aprovação.'
      }
    };
    
    this.errorMsg = error[errorMsg] || { input: 'user', message: errorMsg };
  }
}
