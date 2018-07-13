export interface Price {
  _id?: string;
  pickup: number;
  subscription: number;
  tax: number;
  date?: Date;
  fees?: Fee[];
}

export interface Fee {
  _id?: string;
  animal: string;
  feeAmount: number;
  taxable: boolean;
  appliesToo: string;
}



