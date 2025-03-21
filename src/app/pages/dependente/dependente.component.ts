import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { UserData } from '../../core/models/userData.model';
import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dependente',
  imports: [MatDialogModule, CpfCnpjMaskDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './dependente.component.html',
  styleUrl: './dependente.component.scss'
})
export class DependenteComponent {

  private fb = inject(NonNullableFormBuilder);
  private dataService = inject(CoreService)
  private userData = JSON.parse(localStorage.getItem('userData') as string) as UserData
  private dialog = inject(Dialog)

  updateMessage = {status:'', message:''}

  dependentForm = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    cpf:['', [Validators.required, Validators.minLength(11)]],
    birthDate:['',[Validators.required]  ],
    relationship:['', [Validators.required]],
    file: new FormControl< File | null>(null),
    hasDisability:[false]
  })

  fileName = ''

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.fileName = file.name
      this.dependentForm.get('file')?.setValue(file);
    }
  }
  
  openDialog(templateRef:TemplateRef<HTMLElement>){

  }

  closeDialog(){
    this.dialog.closeAll()
  }

  submit(){
    const formData = new FormData();

    // Object.keys(this.dependentForm.controls).forEach(key => {
    //   key !== 'hasDisability' ?
    //     formData.append(key, this.dependentForm.get(key)?.value) : null
    // });

    this.dataService.setDependent(formData,this.userData.id).subscribe({
      next:(response)=>{
        this.updateMessage = {status:'sucess', message:'Dependente cadastrado com sucesso !'}
      },
      error:(error:HttpErrorResponse)=>{
        this.updateMessage = {status:'error', message:'Erro ao cadastrar o dependente - '+ 'Cod:'+error.status}
        throw error
      }
    })
    
  }
}
