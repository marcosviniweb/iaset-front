import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIUrl } from '../env/apiUrl';
import { UserData, userResponse } from '../models/userData.model';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private router = inject(Router)
  private httpClient = inject(HttpClient)
  private apiUrl = APIUrl
  userData:UserData = JSON.parse(localStorage.getItem('userData') as string);

  async auth(body:{email:string, password:string}) {
    return firstValueFrom(this.httpClient.post<userResponse>(this.apiUrl.auth, body))
    .then((response)=>{
      this.userData = response.user
      localStorage.setItem('userData', JSON.stringify(response.user))
      localStorage.setItem('token', response.access_token)
      
      if(response.user.firstAccess){
        this.router.navigate(['/primeiro-acesso'])
      }else {
        this.router.navigate(['/'])
      }
     return response.user
    })
    .catch((error)=>{
      throw error
    })
  }

  logOff(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  async passwordChange(body:{
    oldPassword: string ;
    newPassword: string;
  }){
    return firstValueFrom(this.httpClient.put(this.apiUrl.dataUser+`/${this.userData.id}/password`, body))
     
  }
}
