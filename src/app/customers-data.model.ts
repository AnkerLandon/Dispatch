export interface Customer {
  id: number;
  name: string;
  address?: string;
  city?: string;
  payment?: pay;

}


enum pay {
    cash = 'cash',
    subscription = 'subscription'
  }


