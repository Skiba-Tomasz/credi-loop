import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MetamaskService } from '../../services/metamask.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  address?: string;

  constructor(
    private router: Router,
    private metamaskService: MetamaskService
  ) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, {
      paths: 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    });
  }
  async connectWallet() {
    this.metamaskService
      .connectMetaMask()
      .then((resp) => (this.address = this.metamaskService.getUserAddress()));
  }
}
