import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { map, Subject, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';
import { RouteService } from '../../core/services/routeObserver.service';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule, UserCardComponent, RouterModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
})
export class CardViewComponent implements OnInit,AfterViewInit,OnDestroy {
  private breakpoint = inject(BreakpointService);
  private routeService = inject(RouteService)
  private coreService = inject(CoreService)
  userCards: any[] = [];

  carouselDirection: 'horizontal' | 'vertical' = 'horizontal';
  currentCardIndex = 0;

  destroy$ = new Subject();
  acessToCard$ = this.coreService.getUserDataStatus()

  ngOnInit(): void {
    
    this.acessToCard$ = this.coreService.getUserDataStatus()
    this.breakpoint
      .getScreenInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((matches) => {
        if (
          matches.breakpoints[
            '(max-width: 959.98px) and (orientation: landscape)'
          ]
        ) {
          this.carouselDirection = 'horizontal';
        } else if (matches.matches) {
          this.carouselDirection = 'vertical';
        } else {
          this.carouselDirection = 'horizontal';
        }
      });

    this.getCardsData();
    
  }

  ngAfterViewInit(){
    this.acessToCard$ = this.coreService.getUserDataStatus()
  }

  getCardsData() {
    this.coreService.getDataStore()
    .pipe(
      map(data=> data.cardData),
      takeUntil(this.destroy$)
    )
    .subscribe(cards=> this.userCards = cards!)
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
      console.log(index);
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

  contatoWhatsApp(): void {
    const phoneNumber = '5594991890954';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
