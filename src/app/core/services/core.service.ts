import { inject, Injectable } from '@angular/core';
import { Dependent } from './../models/dependents.model';
import { UserData, userResponse } from '../models/userData.model';
import { DataStore } from '../models/dataStore.model';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CardData } from '../models/cardData.model';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(){
    if(this.localData){
      //checagem de dados para o cartão
      this.checkUserData(this.localData.userData!)
    }

  }
  //variaveis
  private apiService = inject(DataService);
  private data_store$ = new BehaviorSubject<DataStore>(
    this.localData ? this.localData : {}
  );
  //metodos
  async setInitialData(initialData: UserData) {

    const userData = initialData;
    this.checkUserData(userData)
    const cardData = await firstValueFrom(
      this.apiService.getCardsData(userData.id)
    );

    const listDependent = await firstValueFrom(
      this.apiService.getDependents(userData.id)
    );

    const coreData = {
      userData: userData,
      listDependent: listDependent,
      cardData: cardData,
      dependent: null,
    };
    this.setLocalData(coreData);
    
    return this.data_store$.next(coreData as DataStore);
  }

  getDataStore() {
    return this.data_store$;
  }

  async getListDependent(){
    const userId = this.data_store$.getValue().userData!.id
    const list = await firstValueFrom(this.apiService.getDependents(userId))
    this.updateDataStore(list, 'listDependent')
  }

  setUser(formData:FormData){
    return this.apiService.setUser(formData)
  }
  
  setDepedent(formData:FormData){
    const userId = this.data_store$.getValue().userData!.id
    return this.apiService.setDependent(userId, formData)
  }

  updateUserData(formData:FormData){
    const userId = this.data_store$.getValue().userData!.id
    return this.apiService.updateUserData(userId, formData)
  }
  updateFirstAccess(status:boolean){
    const userId = this.data_store$.getValue().userData!.id
    return this.apiService.updateFirstAccess(userId, status)
  }

  updateDependent(dependentId:number,formData:FormData){
    const userId = this.data_store$.getValue().userData!.id
   return this.apiService.updateDependent(userId, dependentId, formData)
  }
  //atualiza os dados de uma propriedade especifica
  updateDataStore(
    data: UserData | CardData[] | Dependent | Dependent[] | null,
    dataType: 'userData' | 'dependent' | 'cardData' |'listDependent'
  ) {
    const newData = {
      ...this.data_store$.getValue(),
      [dataType!]: data,
    } as DataStore;
    this.setLocalData(newData);
    this.checkUserData(newData.userData!)
    this.data_store$.next(newData);
  }

  //metodo para atualizar os dados depois de uma alteração de dados (dependente)
  async newDataRequest(){
    const userId = this.data_store$.getValue().userData!.id
    const cardData = await firstValueFrom(
      this.apiService.getCardsData(userId)
    );
    this.updateDataStore(cardData, 'cardData')

    const listDependent = await firstValueFrom(
      this.apiService.getDependents(userId)
    );
    console.log(listDependent)
    this.updateDataStore(listDependent, 'listDependent')
    
  }

  deleteDependent(dependentId:number){
    const userId = this.data_store$.getValue().userData!.id
    firstValueFrom(this.apiService.deleteDependent(userId,dependentId))
    .then(()=> this.newDataRequest())
    .catch(error=> {throw error})
  }

  //localStorage
  get localData() {
    return JSON.parse(localStorage.getItem('coreData') as string) as DataStore;
  }
  
  setLocalData(data: DataStore) {
    localStorage.setItem('coreData', JSON.stringify(data));
  }

  //valida os dados para mostrar o cartão
  private userData$ = new BehaviorSubject<boolean>(false);  

  private checkUserData(userData:UserData): void {
    const isProfileComplete = userData && userData.name && userData.matricula && userData.cpf && userData.birthDay;
    this.userData$.next(!!isProfileComplete);
  }

  getUserDataStatus(){
    return this.userData$.asObservable()
  }
  
}
