import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import {  map, Observable, shareReplay, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardData } from '../../core/models/cardData.model';
import { Depedent } from '../../core/models/dependents.model';

@Component({
  selector: 'app-lista-dependente',
  imports: [CommonModule],
  templateUrl: './lista-dependente.component.html',
  styleUrl: './lista-dependente.component.scss'
})
export class ListaDependenteComponent implements OnInit, OnDestroy{
  private serviceCore = inject(CoreService);

  userData = JSON.parse(localStorage.getItem('userData') as string);

  destroy$ = new Subject();

  listDependents$:Observable<Depedent[]> = this.serviceCore.getDependent(this.userData.id)
  .pipe(
    takeUntil(this.destroy$),
    shareReplay(1),
  )
 

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
      this.destroy$.next(''),
      this.destroy$.complete()
  }
}
