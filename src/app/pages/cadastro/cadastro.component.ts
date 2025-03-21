import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';
import { PhoneMaskDirective } from '../../shared/directives/phoneMask.directive';
import { CoreService } from '../../core/services/core.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
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
  fb = inject(NonNullableFormBuilder)

  formType = this.fb.control('funcionario')

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    matricula: ['', ],
    birthDay:['',],
    cpf: ['', [Validators.required]],
    rg: [''],
    vinculo: ['', ],
    lotacao: ['', ],
    endereco: ['', ],
    email: ['', ],
    phone: ['',],
    password: ['',[Validators.required]],
    confirmPassowrd: ['', [Validators.required]],
    photo: new FormControl<File | null>(null)
  })

  profileImg: string | undefined; // Variável para armazenar a URL da imagem
  destroy$ = new Subject()
  statusError = 0
  ngOnInit(): void {
    // this.registerForm.get('photo')?.addValidators()
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


  submitForm() {
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.keys(this.registerForm.controls).forEach(key => {
        key !== 'confirmPassowrd' ?
          formData.append(key, this.registerForm.get(key)?.value) : null
      });
      console.log('Formulário enviado com sucesso!');
      this.dataService.setUser(formData)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next:(response)=> {
          console.log(response)
          this.openDialog(this.templateSucess)
        },
        error:(error:HttpErrorResponse)=>{
          this.statusError = error.status
          this.openDialog(this.templateError)
          throw error
        }
      })
      
    }else{
      console.log('Formulário inválido');
    }
  }
  
  openDialog(templete:TemplateRef<HTMLElement>){
    this.dialog.open(templete)
  }

  closeDialog(){
    this.dialog.closeAll()
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassowrd')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next('')
    this.destroy$.complete()
  }
}
