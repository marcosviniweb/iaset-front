import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { firstValueFrom, map } from 'rxjs';


export const firstAcessGuard: CanActivateFn =  async(route, state) => {
  const coreService = inject(DataService);
  const router = inject(Router);
  const userData = await firstValueFrom(coreService.getDataStore()
  .pipe(map(data=> data.userData)))
  
  if (userData) {
    if (userData.firstAccess) {
      router.navigate(['/primeiro-acesso']);
      return false;
    }
  }
  return true;
};
