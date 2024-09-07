import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MetamaskService } from '../services/metamask.service';
import { FormsModule } from '@angular/forms';
import { CreditData } from '../services/dto/lenderboard.dto';
import { DataService } from '../services/data.service';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-credi-score',
  standalone: true,
  imports: [CommonModule, FormsModule, ComponentsModule],
  templateUrl: './credi-score.component.html',
  styleUrl: './credi-score.component.scss',
})
export class CrediScoreComponent implements OnInit {
  address?: string;
  searchTerm?: string;
  data?: CreditData[];
  filteredData?: CreditData[];
  addressData?: CreditData;
  asc: boolean = true;

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
      this.data = results.sort((a, b) => b.creditScore - a.creditScore);
      this.filteredData = this.data.slice(0, 50);
    });
  }

  onSearch() {
    if (this.searchTerm && this.searchTerm.length >= 3) {
      this.filteredData = this.data?.filter((d) =>
        this.searchTerm ? d.address.includes(this.searchTerm) : false
      );
    }
  }

  sort() {
    console.log(`Sort`);
    this.asc = !this.asc;
    if (this.searchTerm) {
      this.filteredData = this.filteredData?.sort((a, b) =>
        this.asc ? b.creditScore - a.creditScore : a.creditScore - b.creditScore
      );
    } else {
      this.filteredData = this.data
        ?.sort((a, b) =>
          this.asc
            ? b.creditScore - a.creditScore
            : a.creditScore - b.creditScore
        )
        .slice(0, 50);
    }
  }
}
