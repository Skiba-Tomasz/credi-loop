import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { Installment } from '../services/dto/lenderboard.dto';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [ComponentsModule, CommonModule],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.scss',
})
export class MyLoansComponent {
  records?: Installment[];
  constructor(dataService: MockDataService) {
    this.records = dataService
      .getInstallements(12)
      .sort(
        (a, b) => a.dueDate.getMilliseconds() - b.dueDate.getMilliseconds()
      );
  }
}
