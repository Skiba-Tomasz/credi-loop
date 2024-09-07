import { Component, OnInit } from '@angular/core';
import { LenderBoardRecord } from '../services/dto/lenderboard.dto';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule } from '@angular/common';
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy search
import { FormsModule } from '@angular/forms';

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

  constructor(private readonly data: MockDataService) {}

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
}
