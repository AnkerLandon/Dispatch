import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { MainViewComponent } from './dispatch/main/main-view.component';
import { AuthGuard } from './auth/auth.guard';
import { DriverViewComponent } from './drive/driver-view/driver-view.component';
import { RouteSelectComponent } from './drive/route-select/route-select.component';

const routes: Routes = [
  {path: 'customers', component: MainViewComponent, canActivate: [AuthGuard] },
  {path: 'prices', component: MainViewComponent, canActivate: [AuthGuard] },
  {path: 'invoices/:customerId', component: MainViewComponent, canActivate: [AuthGuard]},
  {path: 'bills/:customerId', component: MainViewComponent, canActivate: [AuthGuard]},
  {path: 'users', component: MainViewComponent, canActivate: [AuthGuard]},
  {path: 'routes', component: MainViewComponent, canActivate: [AuthGuard]},
  {path: 'driver', component: RouteSelectComponent },
  {path: 'driver/:route', component: DriverViewComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {

}
