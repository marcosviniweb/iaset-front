import { CoreService } from './../../core/services/core.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserData } from '../../core/models/userData.model';

@Component({
  selector: 'app-primeiro-acesso',
  imports: [RouterModule,CommonModule, ReactiveFormsModule],
  templateUrl: './primeiro-acesso.component.html',
  styleUrl: './primeiro-acesso.component.scss'
})
export class PrimeiroAcessoComponent implements OnInit{
  private authService = inject(AuthService);
  private dataService = inject(CoreService)
  private fb = inject(NonNullableFormBuilder)
  userData:UserData = JSON.parse(localStorage.getItem('userData') as string)

  passwordForm = this.fb.group({
    oldPassword:['', Validators.required],
    newPassword:['', [Validators.required]],
    confirmPassword:['',[Validators.required]]
  })
  ngOnInit(): void {
      this.passwordForm.setValidators(this.passwordMatchValidator)
  }
  
  logOff(){
    this.authService.logOff()
  }

  submit(){
    const data = {
      oldPassword:this.passwordForm.value.oldPassword!,
      newPassword:this.passwordForm.value.newPassword!
     }
    this.authService.passwordChange(data)
    .then(()=> {
      const data = this.userData as any
      const formData = new FormData()
      Object.keys(this.userData).forEach(key => {
          formData.append(key, data) 
      });
      formData.forEach((key,value)=>{
        console.log(key,value)
      })
      // this.dataService.updateUserData(this.userData.id, formData)
    })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  
}
