import { Component, OnInit } from '@angular/core';
import { LenderBoardRecord } from '../services/dto/lenderboard.dto';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule, formatDate } from '@angular/common';
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy search
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LenderBoardModalComponent } from '../lenderboard-modal/lenderboard-modal.component';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-lenderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lenderboard.component.html',
  styleUrls: ['./lenderboard.component.scss'],
})
export class LenderboardComponent implements OnInit {
  boardData: LenderBoardRecord[] = [];
  filteredBoardData?: LenderBoardRecord[] = [];
  searchTerm: string = '';
  fuse?: Fuse<LenderBoardRecord>;
  address?: string;

  constructor(
    private readonly data: DataService,
    private modalService: NgbModal,
    private requestService: RequestService,
    private metamaskService: MetamaskService
  ) {
    metamaskService.$userAddress.subscribe(
      (address) => (this.address = address)
    );
  }

  ngOnInit(): void {
    this.data.getLenderboard().subscribe((response: any) => {
      this.boardData = response;
      this.filteredBoardData = this.boardData.filter(
        (e) => e.accepted === false
      );

      this.fuse = new Fuse(this.boardData, {
        keys: ['address', 'description'],
        threshold: 0.3,
      });
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBoardData = this.boardData;
    } else {
      const searchResult = this.fuse?.search(this.searchTerm);
      this.filteredBoardData = searchResult?.map((result) => result.item);
    }
  }

  openLenderBoardModal() {
    const modalRef = this.modalService.open(LenderBoardModalComponent, {
      backdrop: false,
      keyboard: false,
      centered: true,
    });

    modalRef.result
      .then((result: LenderBoardRecord) => {
        console.log('Modal closed with:', result); // Handle the form data submission here
      })
      .catch((error) => {
        console.log('Modal dismissed');
      });
  }

  async onLend(record: LenderBoardRecord) {
    console.log(record);
    this.address = this.metamaskService.getUserAddress();
    if (!this.address) {
      alert('You have to connect wallet');
      return;
    }
    this.requestService.acceptLoan((record as any).requestNetworkPayload);
    const dueDates = this.generateDates(record.installments);
    const results = [];
    const payments: any[] = [];

    await Promise.all(
      Array.from(Array(record.installments).keys()).map(async (i) => {
        const insValue =
          (record.amount / record.installments) * (1 + record.apy / 100);
        const result = await this.requestService.requestPayment(
          this.address!,
          insValue,
          record.address,
          dueDates[i]
        );
        results.push(result);
        payments.push({
          installmentAmount: insValue,
          installmentPaymentDate: dueDates[i],
          installmentIndex: i,
          requestNetworkPayload: JSON.stringify(result),
        });
      })
    );

    this.data
      .acceptProposal({
        hash: record.hash,
        acceptingAddress: this.address,
        payments: payments,
      })
      .subscribe((results) => {
        console.log(`Completed accept ${JSON.stringify(results)}`);
      });
  }

  generateDates(amount: number): string[] {
    let dates: string[] = [];
    let currentDate = new Date();

    for (let i = 0; i < amount; i++) {
      // Increment by one month
      currentDate.setMonth(currentDate.getMonth() + 1);

      // Format the date as 'YYYY.MM.DD'
      let formattedDate = formatDate(currentDate, 'yyyy.MM.dd', 'en-US');
      dates.push(formattedDate);
    }

    return dates;
  }
}
