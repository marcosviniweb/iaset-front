import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { UpdateData, UserData } from '../../core/models/userData.model';
import { map, skip, Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from '../../shared/directives/phoneMask.directive';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';
import { UrlImg } from '../../core/env/imgUrl';
import { AuthService } from '../../core/auth/auth.service';
import { DataService } from '../../core/services/data.service';

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
  private coreService = inject(DataService)
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
  userId = 0
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
      console.log(value)
      // if (value) {
      //   console.log(value)
      //   const formatDate = this.formatarData(value)
      //   this.updateForm.get('birthDay')?.setValue(formatDate, {emitEvent: false})
      // }
    })
  }

  getUserData(){
    this.coreService.getDataStore()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((data)=>{
      if(data.userData){
        const userData = data.userData
        this.userId = userData.id
        this.updateData(userData)
        console.log(this.userId)
      }
      
    })
  }

  updateData(userData: UserData){
    localStorage.setItem('userData', JSON.stringify(userData))
    
    
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
  
  formatarData(date: string): string | null {
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
    
    this.dataService.updateUserData(this.userId, formData)
    .subscribe({
      next:(response)=> {
        const userData = response as UserData
        this.dialog.closeAll()
        this.updateData(userData)
        this.coreService.updateDataStore(userData, 'userData')
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
