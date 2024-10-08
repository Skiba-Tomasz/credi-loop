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
import { RequestService } from '../services/request.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [ComponentsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.scss',
})
export class MyLoansComponent {
  records?: PaymentRecordDetails[];
  details?: any;
  constructor(
    dataService: DataService,
    metamaskService: MetamaskService,
    private requestService: RequestService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    metamaskService.connectMetaMask().then((_) => {
      dataService.getPayments().subscribe((results) => {
        const filteredResults = results.filter(
          (e) =>
            e.borrower.toLowerCase() ===
            metamaskService.getUserAddress()?.toLowerCase()
        );
        console.log(filteredResults);
        filteredResults.sort((a, b) => a.installmentIndex - b.installmentIndex);
        this.records = filteredResults;
        if (filteredResults.length > 0) {
          this.details = {
            totalMoneyBorrowed: filteredResults.reduce(
              (acc, curr) => acc + curr.installmentAmount,
              0
            ),
            apy:
              filteredResults.reduce((acc, curr) => {
                const apy = curr.apy ? curr.apy : 0;
                return acc + apy;
              }, 0) / filteredResults.length,
            remainingInstallments: filteredResults.length,
          };
        } else {
          this.details = {
            totalMoneyBorrowed: 0,
            apy: 0,
            remainingInstallments: 0,
          };
        }
      });
    });
  }

  onPay(record: PaymentRecordDetails) {
    console.log(record);
    this.spinner.show();
    this.requestService
      .pay((record as any).requestNetworkPayload)
      .then((ok) => {
        this.httpClient
          .post(`https://create-proposal-v1.crediloop.com/pay`, {
            hash: record.hash,
          })
          .subscribe((result) => {
            console.log(result);
            this.spinner.hide();
          });
      });
  }
}
