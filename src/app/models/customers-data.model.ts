export interface Customer {
  _id: string;
  companyName?: string;
  name: string;
  address: string;
  city: string;
  township: string;
  currentPlan: string;
  planLog: [{plan: string, start: Date, end?: Date}];
  route?: string;
}
