import { Injectable } from '@angular/core';
import { Installment, LenderBoardRecord } from './dto/lenderboard.dto';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  getLenderBoardRecords(): Promise<LenderBoardRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            address: '0x2FEd1B23A384fD70a1c9dC324517aBe71A4fD621',
            crediScore: 725,
            amount: 1500,
            installments: 12,
            apy: 5.2,
            description: 'Need funds to expand my home business.',
          },
          {
            address: '0x93c01fFf20D34c15B00d6FbcF3dA34092278Ac49',
            crediScore: 680,
            amount: 2500,
            installments: 24,
            apy: 6.5,
            description: 'Looking to consolidate high-interest debt.',
          },
          {
            address: '0x4BC9023F3b54e1A15fB8E43D3E4A1Fd66C240F70',
            crediScore: 790,
            amount: 5000,
            installments: 36,
            apy: 4.8,
            description: 'Funding new product development for my startup.',
          },
          {
            address: '0xAB81F3C33e3d4A24A6A79F56A61d781eF07C7a2f',
            crediScore: 610,
            amount: 1200,
            installments: 12,
            apy: 7.2,
            description: 'Need funds for emergency medical expenses.',
          },
          {
            address: '0x13E32dD7cB41Fb44E9AB4E32Bc11c1bDE17F54aD',
            crediScore: 845,
            amount: 10000,
            installments: 48,
            apy: 3.9,
            description: 'Expanding an existing business into new markets.',
          },
          {
            address: '0x41DA25cC0177C17cCe26c6eF4D245dBc6B8d4A23',
            crediScore: 720,
            amount: 3200,
            installments: 18,
            apy: 5.8,
            description: 'Financing a family vacation and home improvement.',
          },
          {
            address: '0xFd1FCEdA3eC72e2A197d5F4EcC182E64A97cA0f6',
            crediScore: 655,
            amount: 1800,
            installments: 12,
            apy: 6.7,
            description: 'Covering unexpected car repairs and bills.',
          },
          {
            address: '0xD6c7A33C9E0Bb2A4F3a40c2A3F1bD2C72Afd11A8',
            crediScore: 780,
            amount: 6000,
            installments: 30,
            apy: 4.5,
            description:
              'Renovating home and upgrading equipment for business.',
          },
          {
            address: '0xC45D23EfF36f8CcAcCE3Ed0D9aEfB28B8AcE9F53',
            crediScore: 705,
            amount: 2200,
            installments: 16,
            apy: 5.4,
            description: 'Starting a small-scale e-commerce business.',
          },
          {
            address: '0x5eD62a7C65D7Ea9d7a26Af3A512B32Bb8Ea0A907',
            crediScore: 835,
            amount: 9000,
            installments: 36,
            apy: 4.2,
            description: 'Expanding my software development firm.',
          },
        ]);
      }, 500);
    });
  }

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
