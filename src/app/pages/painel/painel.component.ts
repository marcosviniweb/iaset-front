import { CardData } from './../../core/models/cardData.model';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {  ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { QuickAccessComponent } from '../../components/quick-access/quick-access.component';
import { CommonModule } from '@angular/common';
import { LayoutModule} from '@angular/cdk/layout';
import { BehaviorSubject, filter, map, startWith, Subject, tap } from 'rxjs';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { RouteService } from '../../core/services/routeObserver.service';
import { CoreService } from '../../core/services/core.service';
import { UserData } from '../../core/models/userData.model';

@Component({
  selector: 'app-painel',
  imports: [RouterModule, QuickAccessComponent, CommonModule, LayoutModule],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.scss'
})
export class PainelComponent implements AfterViewInit, OnInit{
  
  private cdf = inject(ChangeDetectorRef)
  private breakPoint = inject(BreakpointService)
  private routeService = inject(RouteService)
  protected CardData:UserData = JSON.parse(localStorage.getItem('userData') as string) 
  private serviceData = inject(CoreService)

  @ViewChild('mobile') mobile!: TemplateRef<any>;
  @ViewChild('desktop') desktop!: TemplateRef<any>;

  templateRef: TemplateRef<any> | null = null
  destroy$ = new Subject()

  pathRoute$ = this.routeService.getCurrentPath()
  .pipe(
    map((value)=> {
      return value === '/' ? true:false
    })
  )

  acessToCard$ = this.routeService.getUserDataStatus()
  currentCardIndex = 0;
  userCards: any[] = [];
  carouselDirection: 'vertical' | 'horizontal' = 'horizontal';

  ngOnInit(): void {
      this.serviceData.getCardsData(this.CardData.id)
      .subscribe((cards)=>{
        this.userCards = cards
      })
  }
  ngAfterViewInit(): void {
     this.breakPoint.getScreenInfo()    
      .subscribe(
        (matches)=>{
          matches.matches? this.templateRef = this.mobile : this.templateRef = this.desktop
         }
      )
      this.cdf.detectChanges()
  }

  navigateCarousel(direction: number): void {
    const newIndex = this.currentCardIndex + direction;
    
    if (newIndex >= 0 && newIndex < this.userCards.length) {
      this.currentCardIndex = newIndex;
    }
  }

  setCurrentCard(index: number): void {
    if (index >= 0 && index < this.userCards.length) {
      this.currentCardIndex = index;
    }
  }

  getTransformStyle(): string {
    if (this.carouselDirection === 'vertical') {
      return `translateY(${-this.currentCardIndex * 100}%)`;
    } else {
      return `translateX(${-this.currentCardIndex * 100}%)`;
    }
  }

  isVertical(): boolean {
    return this.carouselDirection === 'vertical';
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }


}
