import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './core/services/data.service';


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
export class AppComponent implements OnInit{
  private dataService = inject(DataService)
  title = 'IASET';
  ngOnInit(): void {
    this.dataService.getDataStore().subscribe(result=> console.log(result))

  }
 
}
