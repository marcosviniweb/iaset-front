import { firstValueFrom } from 'rxjs';
import { CoreService } from './../../core/services/core.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserData } from '../../core/models/userData.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-esqueceu-senha',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.scss',
})
export class EsqueceuSenhaComponent implements OnInit, AfterViewInit {
  @ViewChild('passwordTemplate') passwordTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('emailTemplate') emailTemplate!: TemplateRef<HTMLElement>;

  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private coreService = inject(CoreService);
  private activatedRoute = inject(ActivatedRoute);
  private cdf = inject(ChangeDetectorRef);
  private route = inject(Router);

  tokenPassword = '';
  element!: TemplateRef<HTMLElement>;
  errorMessage = { class: '', message: '' };
  isSubmitting = false;
  emailControl = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);
  passwordForm = this.fb.group({
    oldPassword: ['123456'],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.passwordForm.setValidators(this.passwordMatchValidator);

    // // Verifica se tem usuário autenticado, caso contrário redireciona para login
    // if (!this.userData || !this.userData.id) {
    //   this.route.navigate(['/login']);
    // }
  }
  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.tokenPassword = params['id'];
        this.element = this.passwordTemplate;
        this.cdf.detectChanges();
      } else {
        this.element = this.emailTemplate;
        this.cdf.detectChanges();
      }
    });
  }

  logOff() {
    this.authService.logout();
  }

  async submit() {
    if (this.passwordForm.invalid || this.isSubmitting) {
      // Marcar todos os campos como tocados para mostrar os erros
      Object.values(this.passwordForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = { class: '', message: '' };

    const data = {
      token: this.tokenPassword,
      newPassword: this.passwordForm.value.newPassword!,
    };
    console.log('Alterando senha:', data);

    await this.authService
      .changePasswordFromEmail(data)
      .then(() => {
        this.isSubmitting = false
        console.log('Senha alterada com sucesso');
        this.errorMessage = {
          class: 'positive',
          message: 'Senha alterada com sucesso',
        };
      })
      .catch((error) => {
        this.isSubmitting = false
        this.errorMessage = {
          class: 'negative',
          message:error.error.message? error.error.message
           : 'Não foi possível alterar sua senha. Tente novamente mais tarde.',
        };
        throw error;
      });
  }

  handleError(error: any, defaultMessage: string) {
    console.error('Erro:', error);
    this.errorMessage.class = 'negative';

    if (error.error && error.error.message) {
      // Usar mensagem de erro do backend se disponível
      this.errorMessage = error.error.message;
    } else if (error instanceof HttpErrorResponse) {
      // Tratamento específico para códigos de erro HTTP
      if (error.status === 400) {
        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage.message =
            'Dados inválidos. Verifique as informações e tente novamente.';
        }
      } else if (error.status === 401) {
        this.errorMessage.message =
          'Senha atual incorreta. Por favor, tente novamente.';
      } else if (error.status === 403) {
        this.errorMessage.message =
          'Você não tem permissão para realizar esta ação.';
      } else if (error.status === 404) {
        this.errorMessage.message = 'Usuário não encontrado.';
      } else if (error.status === 0) {
        this.errorMessage.message = 'Erro de conexão. Verifique sua internet.';
      } else {
        this.errorMessage.message = defaultMessage;
      }
    } else {
      this.errorMessage.message = defaultMessage;
    }
  }
  sendEmail() {
    this.isSubmitting = true;
    const emailValue = { email: this.emailControl.value as string };
    console.log(emailValue);
    this.authService.sendPasswordEmail(emailValue).subscribe({
      next: (response) => {
        console.log(response);
        this.isSubmitting = false;
        this.emailControl.reset();
        this.errorMessage = {
          class: 'positive',
          message: 'Email enviado com sucesso! Verifique sua caixa de entrada.',
        };
      },
      error: (error) => {
        console.error(error),
          (this.isSubmitting = false),
          this.emailControl.reset();
        this.errorMessage = {
          class: 'positive',
          message: error.error.message
            ? error.error.message
            : 'Ocorreu um erro durante o processo. tente novamente mais tarde',
        };
      },
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
