import { Component, OnInit } from '@angular/core';
import { LenderBoardRecord } from '../services/dto/lenderboard.dto';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule } from '@angular/common';
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy search
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LenderBoardModalComponent } from '../lenderboard-modal/lenderboard-modal.component';
import { RequestService } from '../services/request.service';

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

  constructor(private readonly data: MockDataService, private modalService: NgbModal, private requestService: RequestService) {}

  ngOnInit(): void {
    this.data.getLenderBoardRecords().then((response: any) => {
      this.boardData = response;
      this.filteredBoardData = this.boardData; 

      this.fuse = new Fuse(this.boardData, {
        keys: [
          'address',
          'description',
        ],
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
    const modalRef = this.modalService.open(LenderBoardModalComponent, { backdrop: false, keyboard: false, centered: true });

    modalRef.result.then((result: LenderBoardRecord) => {
      console.log('Modal closed with:', result); // Handle the form data submission here
    }).catch((error) => {
      console.log('Modal dismissed');
    });
  }
  onLend() {
    this.requestService.requestPayment();
  }
}
