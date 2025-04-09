import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


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
  title = 'IASET';
}
