import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { CoreService } from '../services/core.service';


export const firstAcessGuard: CanActivateFn =  async(route, state) => {
  const coreService = inject(CoreService);
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
