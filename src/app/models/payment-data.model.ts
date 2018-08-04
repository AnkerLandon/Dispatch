export interface Bill {
  _id?: string;
  accountId: string;
  invoiceId?: string;
  createdDate?: string;
  amountDue: number;
  billType: string;
  payments?: Payment[];
}

export interface Payment {
  _id?: string;
  paymentType: string;
  paymentAmount: string;
  checkNumber?: string;
}
