import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CustomerViewComponent } from './data-view/customers/customer-view.component';
import { InvoiceViewComponent } from './data-view/invoices/invoice-view.component';
import { LoginComponent } from './auth/login.component';
import { UserViewComponent } from './data-view/users/user-view.component';

const routes: Routes = [
  {path: 'customers', component: CustomerViewComponent},
  {path: 'invoices/:customerId', component: InvoiceViewComponent},
  {path: 'users', component: UserViewComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
