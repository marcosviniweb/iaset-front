import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { UserData } from '../models/userData.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  
  private router = inject(Router);
  private currentPath$ = new BehaviorSubject<string>('');

  constructor(private coreData:CoreService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.urlAfterRedirects || event.url)
    ).subscribe(path => {
      this.currentPath$.next(path);
    });
  
  }


  getCurrentPath(): Observable<string> {
    return this.currentPath$.asObservable();
  }


}


