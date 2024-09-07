import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-credi-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credi-score.component.html',
  styleUrl: './credi-score.component.scss',
})
export class CrediScoreComponent {
  address?: string;

  constructor(private metamask: MetamaskService) {
    this.address = metamask.getUserAddress();
    metamask.$userAddress.subscribe((address) => (this.address = address));
  }
}
