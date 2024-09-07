import { Injectable } from '@angular/core';
import { Installment, LenderBoardRecord } from './dto/lenderboard.dto';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  getInstallements(count: number): Installment[] {
    const installments: Installment[] = [];

    for (let i = 1; i <= count; i++) {
      const mockInstallment: Installment = {
        address: `123 Example St, City ${i}`,
        dueDate: this.randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        installment: i,
        totalInstallments: 12, // or any other logic
        amount: this.randomAmount(100, 1000),
      };

      installments.push(mockInstallment);
    }

    return installments;
  }

  // Generate random date between two dates
  private randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  // Generate random amount
  private randomAmount(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
