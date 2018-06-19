export interface Customer {
  id: string;
  name: string;
  address: string;
  city: string;
  payment: pay;

}


enum pay {
    cash = 'cash',
    subscription = 'subscription'
  }


