import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit, OnDestroy {
  dots: string = '';
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      this.updateDots();
    });
  }

  updateDots(): void {
    if (this.dots.length >= 3) {
      this.dots = '';
    } else {
      this.dots += '.';
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}