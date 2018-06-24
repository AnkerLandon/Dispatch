export interface Customer {
  _id: string;
  name: string;
  address: string;
  city: string;
  payment: pay;

}


enum pay {
    cash = 'cash',
    subscription = 'subscription'
  }


