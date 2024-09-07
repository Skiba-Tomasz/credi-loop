import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-my-borrows',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './my-borrows.component.html',
  styleUrl: './my-borrows.component.scss',
})
export class MyBorrowsComponent {}
