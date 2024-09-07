import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LenderBoardRecordCreate } from '../services/dto/lenderboard.dto';
import { FormsModule } from '@angular/forms';
import { MetamaskService } from '../services/metamask.service';
import { HttpClient } from '@angular/common/http';
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
    private httpClient: HttpClient
  ) {
    metamaskService.$userAddress.subscribe(
      (address) => (this.address = address)
    );
  }

  onSubmit() {
    console.log(this.record); // Handle form submission
    this.activeModal.close(this.record); // Close modal and pass the form data
    this.httpClient
      .post(
        `https://create-proposal-v1.crediloop.com/create-proposal`,
        this.record
      )
      .subscribe((result) => {
        console.log(result);
      });
  }
}
