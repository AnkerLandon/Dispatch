import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NG_VALIDATORS } from '@angular/forms';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatSortModule,
  MatTableModule,
  MatTable,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatFormFieldControl,
  MatFormFieldModule,
  MatRadioButton,
  MatRadioModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatGridListModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { SearchOrderComponent } from './dispatch/search/search-order/search-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './nav/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DCCustomerComponent } from './dispatch/customers/DC-Customer.component';
import { DCInvoiceComponent } from './dispatch/invoices/DC-Invoice.component';
import { InvoiceViewComponent } from './dispatch/invoices/invoice-view.component';
import { CustomerService } from './dispatch/customers/customer.service';
import { InvoiceService } from './dispatch/invoices/invoice.service';
import { DBInvoiceComponent } from './dispatch/invoices/DB-Invoices.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContextComponent } from './nav/context/context.component';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { RequestsViewComponent } from './dispatch/request/requests-view.component';
import { DBRequestComponent } from './dispatch/request/DB-Request.component';
import { LoginComponent } from './auth/login.component';
import 'hammerjs';
import { UserService } from './dispatch/users/user.service';
import { DCUserComponent } from './dispatch//users/DC-User.component';
import { MainViewComponent } from './dispatch/main/main-view.component';
import { MainService } from './dispatch/main/main.service';
import { AuthInterceptor } from './auth/auth-intercepter';
import { PriceService } from './dispatch/prices/price.service';
import { DCPriceComponent } from './dispatch/prices/DC-Price.component';
import { DriverViewComponent } from './drive/driver-view/driver-view.component';
import { RouteSelectComponent } from './drive/route-select/route-select.component';
import { DriveService } from './drive/drive.service';
import { RouteService } from './dispatch/route/route.service';
import { DCRouteComponent } from './dispatch/route/DC-Route.component';




@NgModule({
  entryComponents: [
    DBInvoiceComponent,
    DCUserComponent,
    DCCustomerComponent,
    DCInvoiceComponent,
    DCRouteComponent,
    DCPriceComponent,
    DBRequestComponent,
  ],
  declarations: [
    AppComponent,
    SearchOrderComponent,
    HeaderComponent,
    MainViewComponent,
    LoginComponent,
    DriverViewComponent,
    RouteSelectComponent,
    RequestsViewComponent,
    DBInvoiceComponent,
    DBRequestComponent,
    DCCustomerComponent,
    DCRouteComponent,
    DCUserComponent,
    DCInvoiceComponent,
    DCPriceComponent,
    ContextComponent,
    InvoiceViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    CommonModule,
    MatSelectModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    CustomerService,
    InvoiceService,
    UserService,
    MainService,
    DriveService,
    RouteService,
    PriceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
