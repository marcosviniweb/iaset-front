import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIUrl } from '../env/apiUrl';
import { UpdateData, UserData } from '../models/userData.model';
import { map, shareReplay, switchMap, tap } from 'rxjs';
import { Depedent } from '../models/dependents.model';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private httpClient = inject(HttpClient)
  private apiUrl = APIUrl
  

  userData = JSON.parse(localStorage.getItem('userData') as string) as UserData
  
  setUser(body:FormData){
    return this.httpClient.post(this.apiUrl.dataUser, body)
  }
  setDependent(body:FormData, userId:number){
    return this.httpClient.post(this.apiUrl.dataUser+`/${userId}/dependents`, body)
  }
  
  getDependent(userId:number){
    return this.httpClient.get<Depedent[]>(this.apiUrl.dataUser+`/${userId}/dependents`)
  }

  getUserData(userId:number){
    return this.httpClient.get<UserData>(this.apiUrl.dataUser+`/${userId}`)
    .pipe(shareReplay(1))
  }

  updateUserData(userId:number, body:FormData){
    return this.httpClient.put(this.apiUrl.dataUser+`/${userId}`, body)
  }

  getCardsData(userId:number){
    return this.getUserData(userId)
    .pipe(
      switchMap((userData) => {
        return this.getDependent(userData.id).pipe(
          map((dependents) => {

            const dependentsWithMatricula = dependents.map((dependent) => {
              return { ...dependent, matricula: userData.matricula };
            });

            const allCards = [userData, ...dependentsWithMatricula];
            return allCards;
          })
        );
      }))
  }


}
