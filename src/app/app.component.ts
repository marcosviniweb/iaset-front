import { LayoutModule } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs';
import { RouteService } from './core/services/routeObserver.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        min-height: 100vh;
        height: 100%;
        
      }
    `,
  ],
})
export class AppComponent {
  private routeService  = inject(RouteService)
  title = 'IASET';

 
}
