import { Dependent } from './../models/dependents.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIUrl } from '../env/apiUrl';
import { UserData } from '../models/userData.model';
import { catchError, map, Observable, shareReplay, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private httpClient = inject(HttpClient)
  private apiUrl = APIUrl
  
  dependent$!:Observable<Dependent[]>
  dependentById$!:Observable<Dependent>
  userData$!:Observable<UserData>

  // Carregar dados do localStorage apenas quando necessário
  get userData() {
    return JSON.parse(localStorage.getItem('userData') as string || '{}') as UserData
  }
  
  setUser(body:FormData){
    console.log('URL da API:', this.apiUrl.dataUser);
    
    // Exibir os dados que estão sendo enviados
    console.log('Enviando dados para o backend:');
    body.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    
    return this.httpClient.post<{id: number, token: string}>(this.apiUrl.dataUser, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erro no cadastro:', error);
          console.error('Detalhes do erro:', error.error);
          console.error('Status:', error.status);
          console.error('Status text:', error.statusText);
          return throwError(() => error);
        })
      );
  }
  
  // Método para atualizar o status de primeiro acesso do usuário
  updateFirstAccess(userId: number, firstAccess: boolean) {
    console.log(`Atualizando firstAccess para ${firstAccess} para usuário ID ${userId}`);
    
    const url = `${this.apiUrl.dataUser}/${userId}/first-access`;
    const body = { firstAccess };
    
    // Cria headers apropriados para a requisição
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    console.log('URL da requisição:', url);
    console.log('Dados enviados:', body);
    
    return this.httpClient.put(url, body, { headers })
      .pipe(
        tap(response => console.log('Resposta da atualização de firstAccess:', response)),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao atualizar firstAccess:', error);
          console.error('Status:', error.status);
          console.error('Mensagem:', error.error);
          return throwError(() => error);
        })
      );
  }
  
  setDependent(userId:number, body:FormData ){
    return this.httpClient.post(this.apiUrl.dataUser+`/${userId}/dependents`, body)
    .pipe(tap(()=> this.getDependents(this.userData.id, 'newRequest')))
  }
  
  getDependents(userId:number, newRequest?:'newRequest'){
    if(!this.dependent$ || newRequest){
      console.log('new Request')
      this.dependent$ = this.httpClient.get<Dependent[]>(this.apiUrl.dataUser+`/${userId}/dependents `)
      .pipe(shareReplay())
    }
    return this.dependent$
  }
  getDependentsCards(userId:number, newRequest?:'newRequest'){
    if(!this.dependent$ || newRequest){
      console.log('new Request')
      this.dependent$ = this.httpClient.get<Dependent[]>(this.apiUrl.dataUser+`/${userId}/dependents?filterByStatus=true `)
      .pipe(shareReplay())
    }
    return this.dependent$
  }

  getUserData(userId:number, newRequest?:'newRequest'){
    if (!this.userData$ || newRequest) {
      console.log('Iniciando nova requisição para dados do usuário', userId)
      this.userData$ = this.httpClient.get<UserData>(this.apiUrl.dataUser+`/${userId}`)
        .pipe(
          tap(userData => {
            console.log('Dados do usuário recebidos:', userId)
            // Atualizar o localStorage com os dados mais recentes
            localStorage.setItem('userData', JSON.stringify(userData))
          }),
          shareReplay(1),
          catchError((error: HttpErrorResponse) => {
            console.error('Erro ao obter dados do usuário:', error)
            return throwError(() => error)
          })
        );
    }
    return this.userData$;
  }

  updateUserData(userId:number, body:FormData){
    return this.httpClient.put(this.apiUrl.dataUser+`/${userId}`, body)
      .pipe(
        tap(response => {
          console.log('Dados atualizados com sucesso')
          // Limpar o cache após atualização
          this.userData$ = null!
          // Atualizar o localStorage com os dados mais recentes
          localStorage.setItem('userData', JSON.stringify(response))
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao atualizar dados do usuário:', error)
          
          // Tratar erro de email duplicado
          if (error.status === 409 || 
              (error.error && error.error.message && 
               error.error.message.includes('esse CPF, matrícula ou e-mail'))) {
            return throwError(() => ({
              ...error,
              error: {
                ...error.error,
                message: 'Este email já está em uso por outro usuário.'
              }
            }))
          }
          
          return throwError(() => error)
        })
      )
  }

  updateDependent(userId:number, depId:number, body:FormData){
    return this.httpClient.put(this.apiUrl.dataUser+`/${userId}/dependents/${depId}`, body)
    .pipe(tap(()=> this.getDependents(this.userData.id)))
  }

  getCardsData(userId:number){
    return this.getUserData(userId)
    .pipe(
      switchMap((userData) => {
        return this.getDependentsCards(userData.id).pipe(
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

  // Método para limpar o cache das requisições
  clearCache(): void {
    this.userData$ = null!;
    this.dependent$ = null!;
    console.log('Cache de requisições limpo');
  }

  // Método para fazer logout completo
  logout(): void {
    // Limpa o cache primeiro
    this.clearCache();
    // Remove dados do localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  }

}
