import { Customer } from '../customers-data.model';
import { Subject } from 'rxjs';

export class RecordService {
  private customers: Customer[] = [];
  private dataUpdate = new Subject<Customer[]>();

  getCustomers() {
    return [...this.customers];
  }

  getDataUpdateListener() {
    return this.dataUpdate.asObservable();
  }

  addCustomer(newCustomer: Customer) {
    this.customers.push(newCustomer);
    this.dataUpdate.next([...this.customers]);
  }


}
