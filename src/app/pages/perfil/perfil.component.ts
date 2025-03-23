import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { UpdateData, UserData } from '../../core/models/userData.model';
import { skip, Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from '../../shared/directives/phoneMask.directive';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';
import { UrlImg } from '../../core/env/imgUrl';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, PhoneMaskDirective, CpfCnpjMaskDirective],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit, OnDestroy {
  private fb = inject(NonNullableFormBuilder)
  private dataService = inject(CoreService)
  readonly dialog = inject(MatDialog)
  private authService = inject(AuthService)
  updateForm = this.fb.group({
    name: ['', [Validators.minLength(2)]],
    birthDay:[''],
    matricula: ['', []], 
    cpf: ['', []], 
    rg: ['', []],
    vinculo: ['', []], 
    lotacao: ['', []], 
    endereco: ['', []], 
    email: ['', [Validators.email]], 
    phone: ['', []], 
    photo: new FormControl<File | null>(null)
  })

  passwordForm = this.fb.group({
    oldPassword:['', [Validators.required]],
    newPassword:['', [Validators.required]],
    confirmPassword:['',[Validators.required]]
  })

  updatePassword = this.fb
  imgUrl = UrlImg
  userData:UserData =  JSON.parse(localStorage.getItem('userData') as string)
  profileImg: string | undefined; // Variável para armazenar a URL da imagem
  destroy$ = new Subject()
  updateMessage = {status:'', message:''}
  updateMessagePass = {status:'', message:''}

  ngOnInit(): void {
    this.passwordForm.setValidators(this.passwordMatchValidator)
    this.getUserData()
    
    // Monitor changes to birthDay and format appropriately
    // But don't add the listener again if we're reloading data
    this.updateForm.get('birthDay')?.valueChanges.subscribe((value) => {
      if (value) {
        const formatDate = this.formatarData(value)
        this.updateForm.get('birthDay')?.setValue(formatDate, {emitEvent: false})
      }
    })
  }

  getUserData(){
    // Primeiro, garantir que estamos usando o ID correto do usuário atualmente logado
    const currentUserData = JSON.parse(localStorage.getItem('userData') as string)
    
    if (currentUserData && currentUserData.id) {
      // Atualizar o userData com os dados atuais do localStorage
      this.userData = currentUserData
      
      // Forçar uma nova requisição para garantir dados atualizados
      this.dataService.getUserData(currentUserData.id, 'newRequest')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next:(userData) => {
          this.updateData(userData)
        },
        error:(error) => {
          console.error('Erro ao carregar dados do usuário:', error)
        }
      })
    }
  }

  updateData(userData: UserData){
    // Atualizar o localStorage com os novos dados
    localStorage.setItem('userData', JSON.stringify(userData))
    
    // Atualizar a variável local
    this.userData = userData
    
    // Aplicar os novos valores ao formulário
    // Formatamos a data para garantir que seja exibida corretamente
    if (userData.birthDay) {
      const formattedBirthDay = this.formatarData(userData.birthDay)
      this.updateForm.patchValue({
        ...userData as any,
        birthDay: formattedBirthDay
      })
    } else {
      this.updateForm.patchValue(userData as any)
    }
  }

  imgFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.updateForm.get('photo')?.setValue(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImg = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  openDialog(template:TemplateRef<HTMLElement>, height?:string){
    this.dialog.open(template,{
      width:'100%',
      maxWidth:'500px',
      height:height? height:'300px',
      panelClass:'padding-modal',
    })
  }
  closeDialog(){
    this.dialog.closeAll()
  }
  formatarData(dataISO: string): string {
    if (!dataISO) return '';
    
    try {
      const data = new Date(dataISO);
      
      // Verifica se a data é válida
      if (isNaN(data.getTime())) {
        console.error('Data inválida:', dataISO);
        return '';
      }
      
      // Obtém os componentes da data
      const ano = data.getUTCFullYear();
      const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
      const dia = String(data.getUTCDate()).padStart(2, '0');
      
      // Retorna no formato yyyy-MM-dd
      return `${ano}-${mes}-${dia}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  }

  editUserProfile(){
    if (this.updateForm.invalid) {
      // Marca todos os campos como tocados para mostrar erros de validação
      Object.keys(this.updateForm.controls).forEach(key => {
        this.updateForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    const formData = new FormData();
    Object.keys(this.updateForm.controls).forEach(key => {
      key !== 'confirmPassowrd' ?
        formData.append(key, this.updateForm.get(key)?.value) : null
    });
    
    this.dataService.updateUserData(this.userData.id, formData)
    .subscribe({
      next:(response)=> {
        this.dialog.closeAll()
        this.updateData(response as UserData)
        this.updateMessage = {status:'sucess', message:'Informações atualizadas com sucesso !'}
      },
      error:(error:HttpErrorResponse)=>{
        const errorMessage = error.error.message == 'Internal server error'? null : error.error.message
        this.dialog.closeAll()
        this.updateMessage = {
          status:'error', 
          message:errorMessage? errorMessage+' cod:'+error.status:'Ocorreu um erro durante a atualização, tente novamente. cod:'+error.status}
        console.error('Erro ao atualizar perfil:', error)
      }
    })
  }
  
  editUserPassword(){
    const data = {
      oldPassword:this.passwordForm.value.oldPassword!,
      newPassword:this.passwordForm.value.newPassword!
     }
    this.authService.passwordChange(data)
    .then((sucess:any)=> {
      const responseMsg = sucess.message
      this.updateMessagePass =  {status:'sucess', message:responseMsg}
    })
    .catch((error:HttpErrorResponse)=>{
     error.error.message
        ?this.updateMessagePass ={status:'error', message:error.error.message}
      :this.updateMessagePass = {status:'error', message:'Ocorreu um erro, tente novamente. Cod:'+error.status}
      console.log( error.error.message  )
      throw error
    })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnDestroy(): void {
      this.destroy$.next('')
      this.destroy$.complete()
  }
}
