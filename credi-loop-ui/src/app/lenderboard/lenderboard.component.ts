import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-lenderboard',
  standalone: true,
  imports: [],
  templateUrl: './lenderboard.component.html',
  styleUrl: './lenderboard.component.scss',
})
export class LenderboardComponent implements OnInit {
  payments?: string;

  constructor(private readonly data: DataService) {}
  ngOnInit(): void {
    this.data.getData().subscribe((response: any) => {
      this.payments = JSON.stringify(response);
    });
  }
}
