import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.scss',
})
export class MyLoansComponent {}
