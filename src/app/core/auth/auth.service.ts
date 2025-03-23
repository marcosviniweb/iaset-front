import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIUrl } from '../env/apiUrl';
import { UserData, userResponse } from '../models/userData.model';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CoreService } from '../services/core.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private router = inject(Router)
  private httpClient = inject(HttpClient)
  private apiUrl = APIUrl
  private coreService = inject(CoreService)
  
  // Usa uma propriedade get para sempre obter os dados mais recentes do localStorage
  get userData(): UserData {
    return JSON.parse(localStorage.getItem('userData') as string || '{}');
  }

  // Obter token de autenticação do localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }
  
  // Método para atualizar os dados do usuário no localStorage
  private updateUserData(userData: UserData): void {
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('Dados do usuário atualizados no localStorage', userData.id);
  }

  // Criar cabeçalhos HTTP com token de autenticação
  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  async auth(body: { emailOrCpf: string; pass: string }): Promise<any> {
    console.log('Autenticando usuário:', body.emailOrCpf);
    
    // Limpar cache anterior para garantir dados limpos
    this.coreService.clearCache();
    
    const headers = this.getAuthHeaders();
    
    try {
      const response = await firstValueFrom(
        this.httpClient.post<userResponse>(this.apiUrl.auth, body, { headers })
      );
      
      console.log('Resposta de login:', response);
      
      // Armazenar token
      localStorage.setItem('token', response.access_token);
      
      // Atualizar dados do usuário
      this.updateUserData(response.user);
        
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

  logout() {
    // Usar o método do CoreService para limpar todos os caches
    this.coreService.logout();
    this.router.navigate(['/login']);
  }

  // Método para limpar todos os dados do usuário ao fazer logout
  clearUserData(): void {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  }

  async passwordChange(data: {oldPassword: string, newPassword: string}) {
    const headers = this.getAuthHeaders();
    
    if (!this.userData || !this.userData.id) {
      console.error('Erro: Dados de usuário não encontrados');
      throw {
        error: {
          message: 'Dados de usuário não encontrados. Faça login novamente.'
        },
        status: 401
      };
    }
    
    try {
      const url = `${this.apiUrl.dataUser}/${this.userData.id}/password`;
      const response = await firstValueFrom(
        this.httpClient.put(url, data, { headers })
      );
      return response;
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      throw error;
    }
  }

  async changeFirstAccess(body: {firstAccess: boolean;}) {
    const headers = this.getAuthHeaders();
    console.log('Atualizando status de primeiro acesso para o usuário:', this.userData.id);
    
    if (!this.userData || !this.userData.id) {
      console.error('Erro: userData ou userData.id não está definido');
      throw {
        error: {
          message: 'Dados de usuário não encontrados. Faça login novamente.'
        },
        status: 401
      };
    }
    
    try {
      const url = `${this.apiUrl.dataUser}/${this.userData.id}/first-access`;
      console.log('URL da requisição:', url);
      
      const response = await firstValueFrom(
        this.httpClient.put(url, body, { headers })
      );
      
      // Atualizar a informação no userData local
      const updatedUserData = {...this.userData, firstAccess: body.firstAccess};
      this.updateUserData(updatedUserData);
      
      return response;
    } catch (error: any) {
      console.error('Erro ao atualizar status de primeiro acesso:', error);
      throw error;
    }
  }
}
