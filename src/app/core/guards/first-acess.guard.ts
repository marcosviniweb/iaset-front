import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const firstAcessGuard: CanActivateFn = (route, state) => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const parsedData = JSON.parse(userData);
    console.log(parsedData)
    if (parsedData.firstAccess) {
      const router = inject(Router);
      router.navigate(['/primeiro-acesso']);
      return false;
    }
  }
  return true;
};
