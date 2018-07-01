import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { InvoiceViewComponent } from './data-view/invoices/invoice-view.component';
import { LoginComponent } from './auth/login.component';
import { MainViewComponent } from './data-view/main/main-view.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'customers', component: MainViewComponent, canActivate: [AuthGuard] },
  {path: 'prices', component: MainViewComponent, canActivate: [AuthGuard] },
  {path: 'invoices/:customerId', component: InvoiceViewComponent, canActivate: [AuthGuard]},
  {path: 'users', component: MainViewComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {

}
