import { Component, input, OnInit } from '@angular/core';
import { CardData } from '../../core/models/cardData.model';
import { CommonModule } from '@angular/common';
import { UrlImg } from '../../core/env/imgUrl';
import { CpfMaskPipe } from '../../shared/pipes/cpf-mask.pipe';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule, CpfMaskPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {
  cardData = input<CardData>()
  cardDataUser:CardData | undefined  
  
  // Usar getter para garantir dados mais atualizados
  get userData() {
    return JSON.parse(localStorage.getItem('userData') as string || '{}')
  }
  
  protected apiUrlImg = UrlImg
  
  ngOnInit(): void {
    this.setCardData()
  }

  setCardData(){
    this.cardDataUser = this.cardData()
  }
}
