import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
  userData:UserData = JSON.parse(localStorage.getItem('userData') as string || '{}');

  // Obter token de autenticação do localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Criar cabeçalhos HTTP com token de autenticação
  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  async auth(body: {emailOrCpf: string, pass: string}) {
    console.log('Tentando login com:', body);
    
    return firstValueFrom(this.httpClient.post<userResponse>(this.apiUrl.auth, body))
    .then((response) => {
      console.log('Resposta de login:', response);
      this.userData = response.user;
      localStorage.setItem('userData', JSON.stringify(response.user));
      localStorage.setItem('token', response.access_token);
      
      if(response.user.firstAccess){
        this.router.navigate(['/primeiro-acesso']);
      } else {
        this.router.navigate(['/']);
      }
      return response.user;
    })
    .catch((error) => {
      console.error('Erro no login:', error);
      // Verificar erro 403 (Forbidden)
      if (error.status === 403) {
        throw {
          error: {
            message: 'Seu acesso ainda não foi aprovado. Aguarde a aprovação.'
          },
          status: 403
        };
      }
      throw error;
    });
  }

  logOff(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  async passwordChange(body: {
    oldPassword: string;
    newPassword: string;
  }) {
    const headers = this.getAuthHeaders();
    console.log('Alterando senha para o usuário:', this.userData.id);
    console.log('Dados enviados:', JSON.stringify(body));
    
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
      const url = `${this.apiUrl.dataUser}/${this.userData.id}/password`;
      console.log('URL da requisição:', url);
      console.log('Headers:', headers);
      
      const response = await firstValueFrom(
        this.httpClient.put(url, body, { headers })
      );
      
      console.log('Resposta de alteração de senha:', response);
      return response;
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      console.error('Status do erro:', error.status);
      console.error('Mensagem do erro:', error.error);
      
      // Tratamento específico para erros comuns
      if (error.status === 400 && error.error?.message?.includes('antiga incorreta')) {
        throw {
          error: {
            message: 'Senha atual incorreta. Verifique e tente novamente.'
          },
          status: 400
        };
      } else if (error.status === 400 && error.error?.message?.includes('não pode ser igual')) {
        throw {
          error: {
            message: 'A nova senha não pode ser igual à senha atual.'
          },
          status: 400
        };
      }
      
      throw error;
    }
  }

  async changeFirstAccess(body: {firstAccess: boolean;}) {
    const headers = this.getAuthHeaders();
    console.log('Atualizando status de primeiro acesso para o usuário:', this.userData.id);
    console.log('Dados enviados:', JSON.stringify(body));
    
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
      console.log('Headers:', headers);
      
      const response = await firstValueFrom(
        this.httpClient.put(url, body, { headers })
      );
      
      console.log('Resposta de atualização de primeiro acesso:', response);
      
      // Atualizar a informação no userData local
      this.userData.firstAccess = body.firstAccess;
      localStorage.setItem('userData', JSON.stringify(this.userData));
      
      return response;
    } catch (error: any) {
      console.error('Erro ao atualizar status de primeiro acesso:', error);
      console.error('Status do erro:', error.status);
      console.error('Mensagem do erro:', error.error);
      throw error;
    }
  }
}
