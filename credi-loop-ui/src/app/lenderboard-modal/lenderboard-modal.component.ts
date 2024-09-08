import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LenderBoardRecordCreate } from '../services/dto/lenderboard.dto';
import { FormsModule } from '@angular/forms';
import { MetamaskService } from '../services/metamask.service';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../services/request.service';
@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-lenderboard-modal',
  templateUrl: './lenderboard-modal.component.html',
  styleUrls: ['./lenderboard-modal.component.scss'],
})
export class LenderBoardModalComponent {
  address?: string;

  @Input() record: LenderBoardRecordCreate = {
    address: '',
    amount: 0,
    installments: 0,
    apy: 0,
    description: '',
    requestNetworkPayload: '',
  };

  constructor(
    public activeModal: NgbActiveModal,
    private metamaskService: MetamaskService,
    private httpClient: HttpClient,
    private requestService: RequestService
  ) {
    metamaskService.$userAddress.subscribe(
      (address) => (this.address = address)
    );
  }

  async onSubmit() {
    this.address = this.metamaskService.getUserAddress();
    if (!this.address) {
      alert('You have to connect wallet');
      return;
    }
    this.record.address = this.address;
    console.log(this.record); // Handle form submission
    const result = await this.requestService.requestPayment(
      this.address,
      this.record.amount
    );
    console.log(`${JSON.stringify(result)}`);
    this.record.requestNetworkPayload = JSON.stringify(result);
    await this.httpClient
      .post(
        `https://create-proposal-v1.crediloop.com/create-proposal`,
        this.record
      )
      .subscribe((result) => {
        console.log(result);
      });
      this.activeModal.close(this.record); // Close modal and pass the form data
  }
}
