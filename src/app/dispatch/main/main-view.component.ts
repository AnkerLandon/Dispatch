import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MainService } from './main.service';
import { CustomerService } from '../customers/customer.service';
import { UserService } from '../users/user.service';
import { PriceService } from '../prices/price.service';
import { RouteService } from '../route/route.service';
import { PaymentService } from '../payments/payment.service';
import { InvoiceService } from '../invoices/invoice.service';


@Component({
  selector: 'app-main-view',
  templateUrl: 'main-view.component.html',
  styleUrls: ['../data-view.component.css']
})

export class MainViewComponent implements OnInit, OnDestroy {
  private records: any[] = [];
  private dataSub: Subscription;
  private subViewSub: Subscription;
  private custId: string;

  public iconExpand = false;
  public status;
  public subStatus;
  public showSub = false;
  public subRecords: any[] = [];
  public subColumns: any[] = [];

  displayedColumns = [ 'edit'];
  dataSourceMain = new MatTableDataSource(this.records);
  dataSourceSub = new MatTableDataSource(this.records);

  constructor(
    private router: Router,
    private routeService: RouteService,
    public mainService: MainService,
    public customerService: CustomerService,
    public userService: UserService,
    public priceService: PriceService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    public route: ActivatedRoute) {
      console.log(this.route.snapshot.routeConfig.path);
    }

  @ViewChild('sortMain') sortMain: MatSort;
  @ViewChild('sortSub') sortSub: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.dataSourceMain.sort = this.sortMain;
    this.dataSourceSub.sort = this.sortSub;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.custId = paramMap.get('customerId');
      console.log('cust', this.custId);
    });
    this.dataSub = this.mainService.getViewUpdateListener()
      .subscribe((records: any[]) => {
        this.setUp();
        this.dataSourceMain.data = records;
        console.log(this.displayedColumns, records);
      });
    this.subViewSub = this.mainService.getSubViewUpdateListener()
      .subscribe((records: any[]) => {
        this.dataSourceSub.data = records;
        console.log('sub view sub', records);
      });
    console.log('main location', this.route.snapshot.routeConfig.path);
    switch (this.route.snapshot.routeConfig.path) {
      case 'customers':
        this.customerService.getCustomers();
        this.status = 'customers';
        this.iconExpand = true;
      break;
      case 'users':
        this.userService.getUsers();
        this.status = 'users';
        this.iconExpand = false;
      break;
      case 'prices':
        this.priceService.getPrices();
        this.status = 'prices';
        this.iconExpand = true;
      break;
      case 'routes':
        this.routeService.getRoutes();
        this.status = 'routes';
        this.iconExpand = false;
      break;
      case 'payments/:customerId':
        this.paymentService.getPayments();
        this.status = 'payments';
        this.iconExpand = false;
      break;
      case 'invoices/:customerId':
        this.invoiceService.getInvoices(this.custId);
        this.status = 'invoices';
        this.iconExpand = true;
      break;
      default: console.log('data error');
    }

  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.subViewSub.unsubscribe();
  }

  addSwitch() {
    switch (this.status) {
      case 'users':
        this.addUserDialog();
        break;
      case 'invoices':
        this.InvoiceDialog('addInvoice');
        this.showSub = false;
        break;
      case 'prices':
        this.addPriceDialog();
        break;
      case 'customers':
        this.addCustomerDialog();
        break;
      case 'routes':
        this.addRouteDialog();
        break;
      case 'payments':
        this.addPaymentDialog();
        break;
      default:
      console.log('addSwitch Error', this.status);
    }
  }

  editSwith(data: any) {
    switch (this.status) {
      case 'users':
        this.editUserDialog(data);
        break;
      case 'prices':
        this.openSubView(data);
        break;
      case 'customers':
        this.customerService.setCurrentCustomer(data._id);
        this.router.navigate(['/invoices/' + data._id]);
        break;
      case 'routes':
        this.editRouteDialog(data);
        break;
      case 'invoices':
        this.invoiceService.setInvoice(data._id);
        this.openSubView(data);
        break;
      default:
      console.log('editSwitch Error');
    }
  }

  openSubView(data) {
    this.showSub = false;
    switch (this.status) {
      case 'prices':
        this.subStatus = 'fees';
        this.dataSourceSub.data = data.fees;
        this.subColumns = this.mainService.subPriceView();
      break;
      case 'invoices':
        this.subStatus = 'Requests';
        this.dataSourceSub.data = data.requests;
        this.subColumns = this.mainService.requestView();
      break;
      default: console.log('openSubView error');
    }
    this.showSub = true;
  }

  subAddSwitch() {
    console.log(this.subStatus);
    switch (this.subStatus) {
      case 'Requests':
        this.InvoiceDialog('addRequest');
      break;
      default: console.log('subAddswitch error');
    }
  }

  subEditSwitch(data) {
    switch (this.subStatus) {
      case 'Requests':
      console.log('test', data);
      data.dialog = 'editRequest';
      data.accountId = this.custId;
      this.mainService.openInvoiceDialog(data);
      break;
      default: console.log('subEditSwitch Error');
    }
  }

  addCustomerDialog() {
    const emptyCustomer = {
      _id: '',
      name: '',
      address: '',
      city: '',
      payment: null
    };
    this.mainService.openCustomerDialog(emptyCustomer);
  }

  InvoiceDialog(type) {
    const emptyRequest = {
      number: null,
      animal: '',
      other: '',
      complete: false,
      price: null,
      accountId: this.custId,
      dialog: type
    };
    this.mainService.openRequestDialog(emptyRequest);
  }

  addUserDialog() {
    const emptyCustomer = {
      _id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: null,
      phone: null,
      rank: ''
    };
    this.mainService.openUserDialog(emptyCustomer);
  }

  addPriceDialog() {
    const emptyCustomer = {
      cow: '',
      heffer: '',
      calf: '',
      bull: '',
      steer: '',
      pig: '',
      sow: '',
      boar: '',
      barrel: ''
    };
    this.mainService.openPriceDialog(emptyCustomer);
  }

  addRouteDialog() {
    const emptyRoute = {
      title: '',
      description: ''
    };
    this.mainService.openRouteDialog(emptyRoute);
  }

  addPaymentDialog() {

  }

  editUserDialog(myUser: any) {
    this.mainService.openUserDialog(myUser);
  }

  editPriceDialog(myUser: any) {
    this.mainService.openPriceDialog(myUser);
  }

  editRouteDialog(myUser: any) {
    this.mainService.openRouteDialog(myUser);
  }


  setUp() {
    this.displayedColumns = this.mainService.display;
    this.subColumns = this.mainService.subDisplay;
  }

}



