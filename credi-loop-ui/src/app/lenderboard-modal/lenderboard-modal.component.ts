import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LenderBoardRecordCreate } from '../services/dto/lenderboard.dto';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-lenderboard-modal',
  templateUrl: './lenderboard-modal.component.html',
  styleUrls: ['./lenderboard-modal.component.scss'],
})
export class LenderBoardModalComponent {
  @Input() record: LenderBoardRecordCreate = {
    address: '',
    amount: 0,
    installments: 0,
    apy: 0,
    description: '',
    requestNetworkPayload: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  onSubmit() {
    console.log(this.record); // Handle form submission
    this.activeModal.close(this.record); // Close modal and pass the form data
  }
}
