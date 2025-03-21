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
    this.loading = true;
    const authData = this.authForm.value as { email: string; password: string };

    this.authService
      .auth(authData)
      .then((response) => {
        console.log(response)
        this.loading = false;
      })
      .catch((error: HttpErrorResponse) => {
        this.showError(error.error.message);
        this.loading = false;
        throw error;
      });
  }

  showError(errorMsg: string) {
    const error: { [key: string]: any } = {
      'Usuário não encontrado.': {
        input: 'user',
        message: 'Usuário não encontrado !',
      },
      'Senha incorreta.': { input: 'pass', message: 'Senha incorreta !' },
    };
    this.errorMsg = error[errorMsg];
  }
}
