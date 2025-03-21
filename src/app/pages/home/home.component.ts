import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [NavComponent, MatIconModule, MatBadgeModule,  RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
}
