import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { InvoiceViewComponent } from './data-view/invoices/invoice-view.component';
import { LoginComponent } from './auth/login.component';
import { MainViewComponent } from './data-view/main/main-view.component';

const routes: Routes = [
  {path: 'customers', component: MainViewComponent},
  {path: 'invoices/:customerId', component: InvoiceViewComponent},
  {path: 'users', component: MainViewComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
