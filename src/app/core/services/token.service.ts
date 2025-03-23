import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  
  constructor() { }
  
  /**
   * Salva o token JWT no localStorage
   * @param token Token JWT a ser armazenado
   */
  setToken(token: string): void {
    if (!token) {
      console.error('Tentativa de salvar token inválido');
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  /**
   * Recupera o token JWT do localStorage
   * @returns O token armazenado ou null se não existir
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  /**
   * Remove o token do localStorage
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  
  /**
   * Verifica se existe um token armazenado
   * @returns true se existir um token, false caso contrário
   */
  hasToken(): boolean {
    return !!this.getToken();
  }
  
  /**
   * Decodifica o payload do token JWT
   * @returns O payload decodificado ou null em caso de erro
   */
  getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
} 