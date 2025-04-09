import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { map, Observable, Subject, } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Dependent } from '../../core/models/dependents.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-dependente',
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-dependente.component.html',
  styleUrl: './lista-dependente.component.scss'
})
export class ListaDependenteComponent implements OnInit,  OnDestroy {
  private coreService = inject(CoreService);
  private route = inject(Router)

  destroy$ = new Subject();

  listDependents$: Observable<Dependent[]> = this.coreService.getDataStore()
  .pipe(map(data=> data?.listDependent!))

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    // this.coreService.newDataRequest()

    const list = this.coreService.getDataStore().getValue().listDependent
    if(list?.find(depedent=> depedent.status === false)){
      console.log('tem em espera')
      this.coreService.newDataRequest()
      //atualiza o valor da lista caso tenha algum dependent em espera
    }   
  }

  deleteDependent(dependentId:number, dependentName:string){
    if(confirm(`Deseje realmente apagar o dependente: ${dependentName} ? `)){
     this.coreService.deleteDependent(dependentId)
    }
    
  }

  editDepedent(dependent:Dependent){
    this.coreService.updateDataStore(dependent, 'dependent')
    console.log('setou')
    this.route.navigate(['/dependente'])
  }

  ngOnDestroy(): void {
    this.destroy$.next(''),
      this.destroy$.complete()
  }
}
