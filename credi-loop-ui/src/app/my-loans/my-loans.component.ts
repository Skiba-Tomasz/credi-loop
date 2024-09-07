import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import {
  Installment,
  PaymentRecord,
  PaymentRecordDetails,
} from '../services/dto/lenderboard.dto';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [ComponentsModule, CommonModule],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.scss',
})
export class MyLoansComponent {
  records?: PaymentRecordDetails[];
  constructor(dataService: DataService, metamaskService: MetamaskService) {
    dataService.getPayments().subscribe((results) => {
      console.log(results);
      console.log(metamaskService.getUserAddress()?.toLowerCase());
      const filteredResults = results.filter(
        (e) =>
          e.borrower.toLowerCase() ===
          metamaskService.getUserAddress()?.toLowerCase()
      );
      this.records = filteredResults;
    });
  }
}
