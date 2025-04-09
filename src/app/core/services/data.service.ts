import { Dependent } from './../models/dependents.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIUrl } from '../env/apiUrl';
import { UserData } from '../models/userData.model';
import {
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { CardData } from '../models/cardData.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private httpClient = inject(HttpClient);
  private apiUrl = APIUrl;

  get userData() {
    return JSON.parse(
      (localStorage.getItem('userData') as string) || '{}'
    ) as UserData;
  }

  // Métodos GET
  getDependents(userId: number) {
    return this.httpClient.get<Dependent[]>(
      this.apiUrl.dataUser + `/${userId}/dependents `
    );
  }

  getDependentsCards(userId: number) {
    return this.httpClient.get<Dependent[]>(
      this.apiUrl.dataUser + `/${userId}/dependents?filterByStatus=true `
    );
  }

  getUserData(userId: number) {
    return this.httpClient
      .get<UserData>(this.apiUrl.dataUser + `/${userId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao obter dados do usuário:', error);
          return throwError(() => error);
        })
      );
  }

  getCardsData(userId: number) {
    return this.getUserData(userId).pipe(
      switchMap((userData) => {
        return this.getDependentsCards(userData.id).pipe(
          map((dependents) => {
            const dependentsWithMatricula = dependents.map((dependent) => {
              return { ...dependent, matricula: userData.matricula };
            });

            const allCards = [
              userData,
              ...dependentsWithMatricula,
            ] as CardData[];
            return allCards;
          })
        );
      })
    );
  }

  // Métodos POST
  setUser(body: FormData) {
    return this.httpClient
      .post<{ id: number; token: string }>(this.apiUrl.dataUser, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erro no cadastro:', error);
          return throwError(() => error);
        })
      );
  }

  setDependent(userId: number, body: FormData) {
    return this.httpClient
      .post(this.apiUrl.dataUser + `/${userId}/dependents`, body)
      .pipe(tap(() => this.getDependents(this.userData.id)));
  }

  // Métodos PUT
  updateFirstAccess(userId: number, firstAccess: boolean) {
    console.log(
      `Atualizando firstAccess para ${firstAccess} para usuário ID ${userId}`
    );

    const url = `${this.apiUrl.dataUser}/${userId}/first-access`;
    const body = { firstAccess };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log('URL da requisição:', url);
    console.log('Dados enviados:', body);

    return this.httpClient.put(url, body, { headers }).pipe(
      tap((response) =>
        console.log('Resposta da atualização de firstAccess:', response)
      ),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao atualizar firstAccess:', error);
        return throwError(() => error);
      })
    );
  }

  updateUserData(userId: number, body: FormData) {
    return this.httpClient.put(this.apiUrl.dataUser + `/${userId}`, body).pipe(
      tap((response) => {
        console.log('Dados atualizados com sucesso');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao atualizar dados do usuário:', error);
        if (
          error.status === 409 ||
          (error.error &&
            error.error.message &&
            error.error.message.includes('esse CPF, matrícula ou e-mail'))
        ) {
          return throwError(() => ({
            ...error,
            error: {
              ...error.error,
              message: 'Este email já está em uso por outro usuário.',
            },
          }));
        }
        return throwError(() => error);
      })
    );
  }

  updateDependent(userId: number, depId: number, body: FormData) {
    return this.httpClient.put<Dependent>(this.apiUrl.dependent + `/${depId}`, body)
  }

  // Métodos DELETE
  deleteDependent(userId: number, dependentId: number) {
    return this.httpClient
      .delete<Dependent>(
        this.apiUrl.dataUser + `/${userId}/dependents/${dependentId}`
      )
      .pipe(tap(() => this.getDependents(this.userData.id)));
  }
}
