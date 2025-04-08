import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { UserData } from '../models/userData.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  
  private router = inject(Router);
  private currentPath$ = new BehaviorSubject<string>('');

  constructor(private coreData:DataService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.urlAfterRedirects || event.url)
    ).subscribe(path => {
      this.currentPath$.next(path);
    });
    this.coreData.getDataStore()
    .pipe(map(data=> data?.userData))
    .subscribe(data=> this.checkUserData(data!))
  }


  getCurrentPath(): Observable<string> {
    return this.currentPath$.asObservable();
  }

private userData$ = new BehaviorSubject<boolean>(false);



private checkUserData(userData:UserData): void {
  const isProfileComplete = userData && userData.name && userData.matricula && userData.cpf && userData.birthDay;
  this.userData$.next(!!isProfileComplete);
  console.log(!!isProfileComplete)
}

getUserDataStatus(){
  return this.userData$.asObservable()
}
}


