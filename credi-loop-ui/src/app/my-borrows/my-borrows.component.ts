import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { Installment } from '../services/dto/lenderboard.dto';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-my-borrows',
  standalone: true,
  imports: [ComponentsModule, CommonModule],
  templateUrl: './my-borrows.component.html',
  styleUrl: './my-borrows.component.scss',
})
export class MyBorrowsComponent {
  records?: Installment[];
  constructor(dataService: MockDataService) {
    this.records = dataService
      .getInstallements(12)
      .sort(
        (a, b) => a.dueDate.getMilliseconds() - b.dueDate.getMilliseconds()
      );
  }
}
