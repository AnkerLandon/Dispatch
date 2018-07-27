import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchOrderComponent } from './dispatch/search/search-order/search-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './nav/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AuthInterceptor } from './auth/auth-intercepter';
import { ErrorInterceptor } from './error.interceptor';

import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { MainViewComponent } from './dispatch/main/main-view.component';
import { LoginComponent } from './auth/login.component';
import { DriverViewComponent } from './drive/driver-view/driver-view.component';
import { RouteSelectComponent } from './drive/route-select/route-select.component';
import { SnackComponent } from './nav/notification/snack.component';
import { ContextComponent } from './nav/context/context.component';

import { CustomerService } from './dispatch/customers/customer.service';
import { InvoiceService } from './dispatch/invoices/invoice.service';
import { MainService } from './dispatch/main/main.service';
import { PriceService } from './dispatch/prices/price.service';
import { DriveService } from './drive/drive.service';
import { RouteService } from './dispatch/route/route.service';
import { PaymentService } from './dispatch/payments/payment.service';
import { UserService } from './dispatch/users/user.service';
import { NotificationService } from './nav/notification/snack.service';

import { DCCustomerComponent } from './dispatch/customers/DC-Customer.component';
import { DCInvoiceComponent } from './dispatch/invoices/DC-Invoice.component';
import { DCPaymentComponent } from './dispatch/payments/DC-Payment.component';
import { DCDriverComponent } from './drive/driver-view/driver-dialog.component';
import { DCPriceComponent } from './dispatch/prices/DC-Price.component';
import { DCRouteComponent } from './dispatch/route/DC-Route.component';
import { DCUserComponent } from './dispatch//users/DC-User.component';

import { AngularMaterialModule } from './angular-material.modual';




@NgModule({
  entryComponents: [
    DCPaymentComponent,
    DCUserComponent,
    DCCustomerComponent,
    DCInvoiceComponent,
    DCRouteComponent,
    DCPriceComponent,
    DCDriverComponent,
    SnackComponent
  ],
  declarations: [
    AppComponent,
    SearchOrderComponent,
    HeaderComponent,
    MainViewComponent,
    LoginComponent,
    SnackComponent,
    DriverViewComponent,
    RouteSelectComponent,
    DCPaymentComponent,
    DCCustomerComponent,
    DCRouteComponent,
    DCUserComponent,
    DCInvoiceComponent,
    DCPriceComponent,
    DCDriverComponent,
    ContextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    CustomerService,
    InvoiceService,
    NotificationService,
    UserService,
    PaymentService,
    MainService,
    DriveService,
    RouteService,
    PriceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
