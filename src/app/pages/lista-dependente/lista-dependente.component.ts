import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { firstValueFrom, map, Observable, shareReplay, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Dependent } from '../../core/models/dependents.model';
import { RouterModule } from '@angular/router';
import { UserData } from '../../core/models/userData.model';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-lista-dependente',
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-dependente.component.html',
  styleUrl: './lista-dependente.component.scss'
})
export class ListaDependenteComponent implements OnInit,  OnDestroy {
  private dataService = inject(CoreService);
  private coreService = inject(DataService);

  userData:UserData = JSON.parse(localStorage.getItem('userData') as string);

  destroy$ = new Subject();

  listDependents$: Observable<Dependent[]> = this.coreService.getDataStore()
  .pipe(map(data=> data?.listDependent!))
  ngOnInit(): void {
    this.coreService.getListDependent()
  }
  deleteDependent(dependentId:number, dependentName:string){
    if(confirm(`Deseje realmente apagar o dependente: ${dependentName} ? `)){
      firstValueFrom(this.dataService.deleteDependent(this.userData.id, dependentId))
    .then((sucess)=> {
     this.listDependents$ = this.dataService
    .getDependents(this.userData.id, 'newRequest')
      console.log(sucess)})
    .catch(error=>{
      throw error
    })
    }
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(''),
      this.destroy$.complete()
  }
}
