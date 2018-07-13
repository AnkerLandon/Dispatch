export interface Payment {
  _id?: string;
  accountId: string;
  invoiceId?: string;
  createdDate: string;
  amountDue: number;
  billType: string;
  paymentType?: string;
  paymentAmount?: number;
  checkNumber?: number;
}
