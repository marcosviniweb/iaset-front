import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIUrl } from '../env/apiUrl';
import { UserData, userResponse } from '../models/userData.model';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CoreService } from '../services/core.service';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private router = inject(Router)
  private httpClient = inject(HttpClient)
  private apiUrl = APIUrl
  private coreService = inject(CoreService)
  private dataService = inject(DataService)

  

  async auth(body: { emailOrCpf: string; pass: string }): Promise<any> {
    console.log('Autenticando usuário:', body.emailOrCpf);
    
    // Limpar cache anterior para garantir dados limpos
    this.coreService.clearCache();
    
    try {
      const response = await firstValueFrom(
        this.httpClient.post<userResponse>(this.apiUrl.auth, body)
      );

      this.dataService.setInitialData(response)
      // Armazenar token
      localStorage.setItem('token', response.access_token);
      

      if(response.user.firstAccess){
        this.router.navigate(['/primeiro-acesso']);
      } else {
        this.router.navigate(['/']);
      }
      
      return response;
    } catch (error: any) {
      console.error('Erro de autenticação:', error);
      
      if (error.status === 403) {
        throw {
          error: {
            message: 'Seu acesso ainda não foi aprovado. Aguarde a aprovação.'
          },
          status: 403
        };
      }
      
      throw error;
    }
  }


  logout(): void {
    this.clearUserData()
    this.router.navigate(['/login'])
  }


  clearUserData(): void {
    localStorage.removeItem('coreData');
    localStorage.removeItem('token');
  }

  async passwordChange(data: {oldPassword: string, newPassword: string}) {
    const userData = this.dataService.getDataStore().value.userData
    if (!userData || !userData.id) {
      console.error('Erro: Dados de usuário não encontrados');
      throw {
        error: {
          message: 'Dados de usuário não encontrados. Faça login novamente.'
        },
        status: 401
      };
    }
    
    try {
      const url = `${this.apiUrl.dataUser}/${userData.id}/password`;
      const response = await firstValueFrom(
        this.httpClient.put(url, data)
      );
      return response;
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      throw error;
    }
  }

  async changeFirstAccess(body: {firstAccess: boolean;}) {
    const userData = this.dataService.getDataStore().value.userData
 
    if (!userData || !userData.id) {
      console.error('Erro: userData ou userData.id não está definido');
      throw {
        error: {
          message: 'Dados de usuário não encontrados. Faça login novamente.'
        },
        status: 401
      };
    }
    
    try {
      const url = `${this.apiUrl.dataUser}/${userData.id}/first-access`;
      console.log('URL da requisição:', url);
      
      const response = await firstValueFrom(
        this.httpClient.put(url, body)
      );
    
    
      
      return response;
    } catch (error: any) {
      console.error('Erro ao atualizar status de primeiro acesso:', error);
      throw error;
    }
  }
}
