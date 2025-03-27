import { UserData } from './../../core/models/userData.model';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { CoreService } from '../../core/services/core.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouteService } from '../../core/services/routeObserver.service';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule, UserCardComponent, RouterModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
})
export class CardViewComponent implements OnInit, OnDestroy {
  private breakpoint = inject(BreakpointService);
  private dataService = inject(CoreService);
  private route = inject(ActivatedRoute);
  private routeService = inject(RouteService)

  UserData = JSON.parse(localStorage.getItem('userData') as string) as UserData;
  userCards: any[] = [];

  carouselDirection: 'horizontal' | 'vertical' = 'horizontal';
  currentCardIndex = 0;

  destroy$ = new Subject();
  acessToCard$ = this.routeService.getUserDataStatus()

  ngOnInit(): void {
    this.acessToCard$ = this.routeService.getUserDataStatus()
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

  

  getCardsData() {
    this.dataService
      .getCardsData(this.UserData.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((allCards) => {
        this.userCards = allCards;

        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
          const id = params['id'];
          if (id && this.isVertical()) {
            this.userCards = [];
            this.userCards.push(allCards[id]);
          }
        });
      });
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

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
