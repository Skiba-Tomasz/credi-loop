export interface LenderBoardRecord {
  address: string;
  crediScore: number;
  amount: number;
  installments: number;
  apy: number;
  description: string;
}


export interface PaymentRecord {
  address: string;
  crediScore: number;
  amount: number;
  installments: number;
  apy: number;
  description: string;
  time: Date;
}
