import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('token');

  // Verifica se a rota atual é a página de login
  const isLoginPage = state.url === '/login';
  const isRegisterPage = state.url === '/cadastro'
  // Se não existir token
  if (!token) {
    // Se não estiver na página de login ou cadastro, redireciona para login
    if (!isLoginPage && !isRegisterPage) {
      router.navigate(['/login']);
      return false;
    }
    // Permite acesso à página de login ou cadastro quando não há token
    return true;
  } else {
    // Se existir token e estiver tentando acessar a página de login
    // redireciona para a home
    if (isLoginPage || isRegisterPage) {
      router.navigate(['/']);
      return false;
    }
    // Permite acesso a todas as outras páginas quando há token
    return true;
  }

 
};
