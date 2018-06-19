import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CustomerViewComponent } from './data-view/customers/customer-view.component';
import { InvoiceViewComponent } from './data-view/invoices/invoice-view.component';

const routes: Routes = [
  {path: '', component: CustomerViewComponent},
  {path: 'invoices/:customerId', component: InvoiceViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
