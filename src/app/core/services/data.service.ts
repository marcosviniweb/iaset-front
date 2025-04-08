import { inject, Injectable } from '@angular/core';
import { Dependent } from './../models/dependents.model';
import { UserData, userResponse } from '../models/userData.model';
import { DataStore } from '../models/dataStore.model';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CardData } from '../models/cardData.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiService = inject(CoreService);

  private data_store$ = new BehaviorSubject<DataStore>(
    this.localData ? this.localData : {}
  );

  async setInitialData(initialData: userResponse) {
    const userData = initialData.user;

    const cardData = await firstValueFrom(
      this.apiService.getCardsData(initialData.user.id)
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
  async getListDependent(){
    const list = await firstValueFrom(this.apiService.getDependents(this.localData.userData!.id))
    console.log(list)
    this.updateDataStore(list, 'listDependent')
  }

  updateDataStore(
    data: UserData | CardData | Dependent | Dependent[],
    dataType: 'userData' | 'dependent' | 'cardData' |'listDependent'
  ) {
    const newData = {
      ...this.data_store$.value,
      [dataType!]: data,
    } as DataStore;
    this.setLocalData(newData);
    this.data_store$.next(newData);
  }

  getDataStore() {
    return this.data_store$;
  }

  get localData() {
    return JSON.parse(localStorage.getItem('coreData') as string) as DataStore;
  }
  
  setLocalData(data: DataStore) {
    localStorage.setItem('coreData', JSON.stringify(data));
  }
}
