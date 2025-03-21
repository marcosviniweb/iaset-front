import { Dependent } from './../models/dependents.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIUrl } from '../env/apiUrl';
import { UserData } from '../models/userData.model';
import { map, Observable, shareReplay, switchMap, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private httpClient = inject(HttpClient)
  private apiUrl = APIUrl
  
  dependent$!:Observable<Dependent[]>
  dependentById$!:Observable<Dependent>
  userData$!:Observable<UserData>

  userData = JSON.parse(localStorage.getItem('userData') as string) as UserData
  
  setUser(body:FormData){
    return this.httpClient.post(this.apiUrl.dataUser, body)
    .pipe(tap(()=> this.getUserData(this.userData.id)))
  }
  setDependent(userId:number, body:FormData ){
    return this.httpClient.post(this.apiUrl.dataUser+`/${userId}/dependents`, body)
    .pipe(tap(()=> this.getDependents(this.userData.id, 'newRequest')))
  }
  
  getDependents(userId:number, newRequest?:'newRequest'){
    if(!this.dependent$ || newRequest){
      console.log('new Request')
      this.dependent$ = this.httpClient.get<Dependent[]>(this.apiUrl.dataUser+`/${userId}/dependents`)
      .pipe(shareReplay())
    }
    return this.dependent$
  }

  getUserData(userId:number, newRequest?:'newRequest'){
    if (!this.userData$ || newRequest) {
      console.log('new Request for user data')
      this.userData$ = this.httpClient.get<UserData>(this.apiUrl.dataUser+`/${userId}`)
        .pipe(shareReplay());
    }
    return this.userData$;
  }

  updateUserData(userId:number, body:FormData){
    return this.httpClient.put(this.apiUrl.dataUser+`/${userId}`, body)
  }

  updateDependent(userId:number, depId:number, body:FormData){
    return this.httpClient.put(this.apiUrl.dataUser+`/${userId}/dependents/${depId}`, body)
    .pipe(tap(()=> this.getDependents(this.userData.id)))
  }

  getCardsData(userId:number){
    return this.getUserData(userId)
    .pipe(
      switchMap((userData) => {
        return this.getDependents(userData.id).pipe(
          map((dependents) => {
            const dependentsWithMatricula = dependents.map((dependent) => {
              return { ...dependent, matricula: userData.matricula };
            });

            const allCards = [userData, ...dependentsWithMatricula];
            return allCards;
          })
        );
      }),
    )
  }

  deleteDependent(userId:number, dependentId:number){
    return this.httpClient.delete<Dependent>(this.apiUrl.dataUser+`/${userId}/dependents/${dependentId}`)
    .pipe(tap(()=> this.getDependents(this.userData.id, 'newRequest')))
  }

}
