import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private router = inject(Router);
  private currentPath$ = new BehaviorSubject<string>('');

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.urlAfterRedirects || event.url)
    ).subscribe(path => {
      this.currentPath$.next(path);
    });
    this.checkUserData();
  }


  getCurrentPath(): Observable<string> {
    return this.currentPath$.asObservable();
  }

private userData$ = new BehaviorSubject<boolean>(false);



private checkUserData(): void {
  const userData = JSON.parse(localStorage.getItem('userData') as string);
  const isProfileComplete = userData && userData.name && userData.matricula && userData.cpf && userData.birthDay;
  this.userData$.next(!!isProfileComplete);
}

getUserDataStatus(){
  return this.userData$.asObservable()
}
}


