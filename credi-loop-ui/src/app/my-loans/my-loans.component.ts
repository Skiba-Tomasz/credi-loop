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
  details?: any;
  constructor(dataService: DataService, metamaskService: MetamaskService) {
    dataService.getPayments().subscribe((results) => {
      const filteredResults = results.filter(
        (e) =>
          e.borrower.toLowerCase() ===
          metamaskService.getUserAddress()?.toLowerCase()
      );
      console.log(filteredResults);
      this.records = filteredResults;
      this.details = {
        totalMoneyBorrowed: filteredResults.reduce(
          (acc, curr) => acc + curr.installmentAmount,
          0
        ),
        apy: filteredResults.reduce((acc, curr) => acc + curr.apy, 0),
        remainingInstallments: 2,
      };
    });
  }
}
