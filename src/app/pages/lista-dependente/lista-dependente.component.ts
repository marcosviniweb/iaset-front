import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { firstValueFrom, map, Observable, shareReplay, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardData } from '../../core/models/cardData.model';
import { Dependent } from '../../core/models/dependents.model';
import { RouterModule } from '@angular/router';
import { UserData } from '../../core/models/userData.model';

@Component({
  selector: 'app-lista-dependente',
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-dependente.component.html',
  styleUrl: './lista-dependente.component.scss'
})
export class ListaDependenteComponent implements  OnDestroy {
  private dataService = inject(CoreService);

  userData:UserData = JSON.parse(localStorage.getItem('userData') as string);

  destroy$ = new Subject();

  listDependents$: Observable<Dependent[]> = this.dataService
    .getDependents(this.userData.id)
    .pipe(
      takeUntil(this.destroy$),
    )

  deleteDependent(dependentId:number){
    firstValueFrom(this.dataService.deleteDependent(this.userData.id, dependentId))
    .then((sucess)=> {
      console.log(sucess)})
    .catch(error=>{
      throw error
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(''),
      this.destroy$.complete()
  }
}
