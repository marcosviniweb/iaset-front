import { firstValueFrom } from 'rxjs';
import { CoreService } from './../../core/services/core.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserData } from '../../core/models/userData.model';

@Component({
  selector: 'app-primeiro-acesso',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './primeiro-acesso.component.html',
  styleUrl: './primeiro-acesso.component.scss'
})
export class PrimeiroAcessoComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder)

  userData: UserData = JSON.parse(localStorage.getItem('userData') as string)
  private route = inject(Router)
  passwordForm = this.fb.group({
    oldPassword: ['123456'],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })
  ngOnInit(): void {
    this.passwordForm.setValidators(this.passwordMatchValidator)
  }

  logOff() {
    this.authService.logOff()
  }

  async submit() {
    const data = {
      oldPassword: this.passwordForm.value.oldPassword!,
      newPassword: this.passwordForm.value.newPassword!
    }
    console.log(data)

    await this.authService.passwordChange(data)
      .then(async() => {
        await this.changeFirstAcess()
          .then(() => {
            this.route.navigate(['/'])
          })
          .catch(error => {
            throw error
          })
      })
      .catch((error) => {
        throw error
      })


  }

  changeFirstAcess() {
    return this.authService.changeFirstAccess({ firstAccess: false })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }


}
