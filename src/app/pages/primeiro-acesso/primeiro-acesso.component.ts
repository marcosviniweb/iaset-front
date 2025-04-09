import { firstValueFrom } from 'rxjs';
import { CoreService } from './../../core/services/core.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserData } from '../../core/models/userData.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-primeiro-acesso',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './primeiro-acesso.component.html',
  styleUrl: './primeiro-acesso.component.scss'
})
export class PrimeiroAcessoComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private coreService = inject(CoreService)

  userData: UserData = JSON.parse(localStorage.getItem('userData') as string || '{}');
  private route = inject(Router);
  
  errorMessage: string | null = null;
  isSubmitting = false;
  
  passwordForm = this.fb.group({
    oldPassword: ['123456'],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });
  
  ngOnInit(): void {
    this.passwordForm.setValidators(this.passwordMatchValidator);
    
    // Verifica se tem usuário autenticado, caso contrário redireciona para login
    if (!this.userData || !this.userData.id) {
      this.route.navigate(['/login']);
    }
  }

  logOff() {
    this.authService.logout();
  }

  async submit() {
    if (this.passwordForm.invalid || this.isSubmitting) {
      // Marcar todos os campos como tocados para mostrar os erros
      Object.values(this.passwordForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    
    const data = {
      oldPassword: this.passwordForm.value.oldPassword!,
      newPassword: this.passwordForm.value.newPassword!
    };
    console.log('Alterando senha:', data);

    try {
      // Passo 1: Alterar a senha
      await this.authService.passwordChange(data);
      console.log('Senha alterada com sucesso');
      
      try {
        // Passo 2: Atualizar flag de primeiro acesso
        await this.authService.changeFirstAccess({ firstAccess: false });
        console.log('Status de primeiro acesso atualizado com sucesso');
        
        // Atualizar userData no localStorage para refletir a mudança no firstAccess
        if (this.userData) {
          this.userData.firstAccess = false;
          this.coreService.updateDataStore(this.userData, 'userData')
        }
        
        // Sucesso - redirecionar para a página principal
        this.route.navigate(['/']);
      } catch (error) {
        this.handleError(error, 'Não foi possível atualizar seu status de primeiro acesso. Entre em contato com o suporte.');
      }
    } catch (error) {
      this.handleError(error, 'Não foi possível alterar sua senha. Tente novamente mais tarde.');
    } finally {
      this.isSubmitting = false;
    }
  }
  
  handleError(error: any, defaultMessage: string) {
    console.error('Erro:', error);
    
    if (error.error && error.error.message) {
      // Usar mensagem de erro do backend se disponível
      this.errorMessage = error.error.message;
    } else if (error instanceof HttpErrorResponse) {
      // Tratamento específico para códigos de erro HTTP
      if (error.status === 400) {
        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
        }
      } else if (error.status === 401) {
        this.errorMessage = 'Senha atual incorreta. Por favor, tente novamente.';
      } else if (error.status === 403) {
        this.errorMessage = 'Você não tem permissão para realizar esta ação.';
      } else if (error.status === 404) {
        this.errorMessage = 'Usuário não encontrado.';
      } else if (error.status === 0) {
        this.errorMessage = 'Erro de conexão. Verifique sua internet.';
      } else {
        this.errorMessage = defaultMessage;
      }
    } else {
      this.errorMessage = defaultMessage;
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
