import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';
import { PhoneMaskDirective } from '../../shared/directives/phoneMask.directive';
import { CoreService } from '../../core/services/core.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, CpfCnpjMaskDirective, PhoneMaskDirective, MatIconModule, MatDialogModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  @ViewChild('dialog') templateSucess!:TemplateRef<HTMLElement>
  @ViewChild('dialogError') templateError!:TemplateRef<HTMLElement>

  private dataService = inject(CoreService)
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  fb = inject(NonNullableFormBuilder)

  formType = this.fb.control('funcionario')
  isSubmitting = false; 
  dialogRef: MatDialogRef<any> | null = null;

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    matricula: [''],
    birthDay: [''],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    rg: [''],
    vinculo: [''],
    lotacao: [''],
    endereco: [''],
    email: ['', [Validators.email]],
    phone: [''],
    password: ['',[Validators.required, Validators.minLength(6)]],
    confirmPassowrd: ['', [Validators.required]],
    photo: new FormControl<File | null>(null),
    firstAccess: [false]
  })

  profileImg: string | undefined; // Variável para armazenar a URL da imagem
  destroy$ = new Subject()
  statusError = 0
  errorMessage = '';
  
  ngOnInit(): void {
    // Adicionando o validador personalizado
    this.registerForm.setValidators(this.passwordMatchValidator);
  }

  imgFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registerForm.get('photo')?.setValue(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImg = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  formatDate(date: string): string | null {
    if (!date) return null;
    
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return null;
      }
      return dateObj.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    } catch (error) {
      return null;
    }
  }

  // Função para limpar caracteres especiais do CPF
  limparCPF(cpf: string): string {
    // Remove pontos, traços e espaços
    return cpf.replace(/[.-\s]/g, '');
  }

  submitForm() {
    if (this.registerForm.valid) {
      
      
      console.log('Valores do formulário:', this.registerForm.value);
      const formData = new FormData();
      
      // Campos obrigatórios sempre presentes
      formData.append('name', this.registerForm.get('name')?.value || '');
      
      // Limpar o CPF antes de enviar (remover pontos e traços)
      const cpfOriginal = this.registerForm.get('cpf')?.value || '';
      const cpfLimpo = this.limparCPF(cpfOriginal);
      formData.append('cpf', cpfLimpo);
      
      formData.append('password', this.registerForm.get('password')?.value || '');
      
      // Processar campos opcionais
      const optionalFields = ['matricula', 'birthDay', 'rg', 'vinculo', 'lotacao', 'endereco', 'email', 'phone'];
      
      optionalFields.forEach(field => {
        const value = this.registerForm.get(field)?.value;
        if (value !== null && value !== undefined && value !== '') {
          if (field === 'birthDay' && value) {
            const formattedDate = this.formatDate(value);
            if (formattedDate) {
              formData.append(field, formattedDate);
            }
          } else {
            formData.append(field, value);
          }
        }
      });
      
      // Adicionar foto se existir
      const photo = this.registerForm.get('photo')?.value;
      if (photo) {
        formData.append('photo', photo);
      }
      
      // Debug: mostrar todos os campos que estão sendo enviados
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      
      this.dataService.setUser(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false; // Resetar a flag, independente do resultado
        })
      )
      .subscribe({
        next:(response)=> {
          console.log('Resposta do servidor:', response);
          
          // Após o cadastro bem-sucedido, atualizar o firstAccess para false
          if (response && response.id) {
            this.updateFirstAccess(response.id);
          } else {
            // Se não tiver ID, apenas mostrar o diálogo de sucesso
            this.openSuccessDialog();
          }
        },
        error:(error:HttpErrorResponse)=>{
          console.error('Erro completo:', error);
          this.statusError = error.status;
          
          // Tratamento específico para o erro de CPF já existente
          if (error.error && error.error.message && error.error.message.includes('User_cpf_key')) {
            this.errorMessage = 'CPF já cadastrado no sistema. Por favor, utilize outro CPF ou entre em contato com o suporte.';
          } else {
            this.errorMessage = error.error?.message || 'Erro ao cadastrar usuário';
          }
          
          this.openDialog(this.templateError);
        }
      });
      
    } else if (!this.isSubmitting) {
      // Marcar todos os campos como tocados para mostrar erros
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  
  // Método para atualizar o firstAccess para false usando o endpoint específico
  updateFirstAccess(userId: number) {
    console.log('Atualizando firstAccess para false para usuário:', userId);
    
    this.dataService.updateFirstAccess(userId, false)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // Garantir que o diálogo seja aberto mesmo se houver erro na atualização
          if (!this.dialogRef) {
            this.openSuccessDialog();
          }
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('FirstAccess atualizado com sucesso:', response);
          this.openSuccessDialog();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro ao atualizar firstAccess:', error);
          // Ainda mostramos o diálogo de sucesso porque o cadastro em si foi bem-sucedido
          this.openSuccessDialog();
        }
      });
  }

  openSuccessDialog() {
    // Abrir diálogo de sucesso
    this.dialogRef = this.dialog.open(this.templateSucess);
    
    // Adicionar um listener para o fechamento do diálogo
    this.dialogRef.afterClosed().subscribe(() => {
      console.log('Diálogo fechado, redirecionando para login');
      this.router.navigate(['/login']);
    });
  }
  
  openDialog(templete:TemplateRef<HTMLElement>){
    this.dialogRef = this.dialog.open(templete);
  }

  closeDialog(){
    this.dialog.closeAll();
    
    // Se o diálogo de sucesso foi fechado, redirecionar para login
    if (this.dialogRef && this.templateSucess) {
      this.router.navigate(['/login']);
    }
  }
  
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassowrd')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
