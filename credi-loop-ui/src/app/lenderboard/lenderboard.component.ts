import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LenderBoardRecord } from '../services/dto/lenderboard.dto';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lenderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lenderboard.component.html',
  styleUrl: './lenderboard.component.scss',
})
export class LenderboardComponent implements OnInit {
  boardData?: LenderBoardRecord[];

  constructor(private readonly data: MockDataService) {}
  ngOnInit(): void {
    this.data.getLenderBoardRecords().then((response: any) => {
      this.boardData = response;
    });
  }
}
