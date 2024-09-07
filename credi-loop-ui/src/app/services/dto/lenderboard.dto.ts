export interface LenderBoardRecord {
  hash: string;
  address: string;
  crediScore: number;
  amount: number;
  installments: number;
  apy: number;
  description: string;
  accepted?: boolean;
}

export interface LenderBoardRecordCreate {
  address: string;
  amount: number;
  installments: number;
  apy: number;
  description: string;
  requestNetworkPayload: string;
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

export interface CreditData {
  creditScore: number;
  partition: string;
  address: string;
}

export interface Installment {
  address: string;
  dueDate: Date;
  installment: number;
  totalInstallments: number;
  amount: number;
}

export interface PaymentRecordDetails {
  lender: string;
  borrower: string;
  isPaid: boolean;
  hash: string;
  requestNetworkPayload: string;
  installmentIndex: number;
  installmentAmount: number;
  installmentPaymentDate: string;
  apy: number;
}
