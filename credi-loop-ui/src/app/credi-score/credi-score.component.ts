import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MetamaskService } from '../services/metamask.service';
import { FormsModule } from '@angular/forms';
import { CreditData } from '../services/dto/lenderboard.dto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-credi-score',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credi-score.component.html',
  styleUrl: './credi-score.component.scss',
})
export class CrediScoreComponent implements OnInit {
  address?: string;
  searchTerm?: string;
  data?: CreditData[];
  filteredData?: CreditData[];
  addressData?: CreditData;

  constructor(
    private metamask: MetamaskService,
    private dataService: DataService
  ) {
    this.address = metamask.getUserAddress();
    metamask.$userAddress.subscribe((address) => {
      this.address = address;
      this.searchTerm = address;
      this.onSearch();
      this.addressData = this.filteredData?.at(0);
    });
  }
  ngOnInit(): void {
    this.dataService.getCrediscores().subscribe((results) => {
      this.data = results;
    });
  }

  onSearch() {
    if (this.searchTerm && this.searchTerm.length >= 3) {
      this.filteredData = this.data?.filter((d) =>
        this.searchTerm ? d.address.includes(this.searchTerm) : false
      );
    }
  }
}
