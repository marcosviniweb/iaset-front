import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private authService = inject(AuthService)

  logOff(){
    this.authService.logout()
  }

  openWhatsApp() {
    const phoneNumber = '5594991890954';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, '_blank');
  }
}
