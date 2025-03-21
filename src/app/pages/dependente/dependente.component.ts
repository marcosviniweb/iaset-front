import { Dependent } from './../../core/models/dependents.model';
import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { UserData } from '../../core/models/userData.model';
import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {  Subject, switchMap, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'app-dependente',
  imports: [
    MatDialogModule,
    CpfCnpjMaskDirective,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './dependente.component.html',
  styleUrl: './dependente.component.scss',
})
export class DependenteComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private dataService = inject(CoreService);
  private dialog = inject(Dialog);
  private activatedRoute = inject(ActivatedRoute);
  
  private userData = JSON.parse(
    localStorage.getItem('userData') as string
  ) as UserData;
  updateMessage = { status: '', message: '' };

  dependentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    birthDate: ['', [Validators.required]],
    relationship: ['', [Validators.required]],
    file: new FormControl<File | null>(null),
    hasDisability: [false],
  });

  destroy$ = new Subject();
  fileName = '';
  warnMsg = {status:false, msg: 'Já cadastrado(a)'};
  submitType:'set'| 'edit' = 'set'
  depId!:number
  
  ngOnInit(): void {
    this.getDependents()
    .pipe(
      takeUntil(this.destroy$),
      tap((dep)=> this.verifySpouse(dep)),
      switchMap(dep=> this.setDependentFromParam(dep))
    )
    .subscribe();
  }

  setDependentFromParam(Dependent:Dependent[]){
    return this.activatedRoute.params
        .pipe(
        takeUntil(this.destroy$),
        tap((params) => {
          const depId = params['id']
          if (depId) {
            this.depId = depId
            const editDep = Dependent.find((dep)=>  dep.id == depId)
            if(editDep){
              this.dependentForm.patchValue(editDep)
              this.dependentForm.controls.birthDate.setValue(this.formatarData(editDep.birthDate))
              this.submitType = 'edit'
            }
          }
        })
      )
    
  }

  getDependents(){
    return this.dataService.getDependents(this.userData.id)
  }

  verifySpouse(dependents:Dependent[]){
    if(!!dependents.find((dep)=> dep.relationship.includes('conjuge'))){
      this.dependentForm.controls.relationship.setValue('filho')
      this.dependentForm.controls.relationship.disable()
      this.warnMsg.status = true
    }
  }
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.fileName = file.name;
      this.dependentForm.get('file')?.setValue(file);
    }
  }

  formatarData(dataISO: string): string {
    if (!dataISO) return '';
    
    const data = new Date(dataISO);
  
    // Obtém os componentes da data
    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(data.getUTCDate()).padStart(2, '0');
    
    // Retorna no formato yyyy-MM-dd
    return `${ano}-${mes}-${dia}`;
  };

  closeDialog() {
    this.dialog.closeAll();
  }

  setDependent() {
    const formData = new FormData();

    Object.keys(this.dependentForm.controls).forEach(key => {
      key !== 'hasDisability' ?
        formData.append(key, this.dependentForm.get(key)?.value) : null
    });

    this.dataService.setDependent(this.userData.id, formData).subscribe({
      next: (response) => {
        this.updateMessage = {
          status: 'sucess',
          message: 'Dependente cadastrado com sucesso !',
        };
      },
      error: (error: HttpErrorResponse) => {
        this.updateMessage = {
          status: 'error',
          message: 'Erro ao cadastrar o dependente - ' + 'Cod:' + error.status,
        };
        throw error;
      },
    });
  }

  updateDependent(){
    const formData = new FormData();

    Object.keys(this.dependentForm.controls).forEach(key => {
      key !== 'hasDisability' ?
        formData.append(key, this.dependentForm.get(key)?.value) : null
    });

    this.dataService.updateDependent(this.userData.id, this.depId ,formData).subscribe({
      next: (response) => {
        console.log(response)
        this.updateMessage = {
          status: 'sucess',
          message: 'Dependente alterado com sucesso !',
        };
      },
      error: (error: HttpErrorResponse) => {
        this.updateMessage = {
          status: 'error',
          message: 'Erro ao cadastrar o dependente - ' + 'Cod:' + error.status,
        };
        throw error;
      },
    });
  }
}
