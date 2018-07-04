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
  MatAutocompleteModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { SearchOrderComponent } from './search/search-order/search-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './nav/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DCCustomerComponent } from './data-view/customers/DC-Customer.component';
import { DCInvoiceComponent } from './data-view/invoices/DC-Invoice.component';
import { InvoiceViewComponent } from './data-view/invoices/invoice-view.component';
import { CustomerService } from './data-view/customers/customer.service';
import { InvoiceService } from './data-view/invoices/invoice.service';
import { DBInvoiceComponent } from './data-view/invoices/DB-Invoices.component';
import { SideBarComponent } from './nav/side-bar/side-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContextComponent } from './nav/context/context.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RequestsViewComponent } from './request/requests-view.component';
import { DBRequestComponent } from './request/DB-Request.component';
import { LoginComponent } from './auth/login.component';
import 'hammerjs';
import { UserService } from './data-view/users/user.service';
import { DCUserComponent } from './data-view/users/DC-User.component';
import { MainViewComponent } from './data-view/main/main-view.component';
import { MainService } from './data-view/main/main.service';
import { AuthInterceptor } from './auth/auth-intercepter';
import { PriceService } from './data-view/prices/price.service';
import { DCPriceComponent } from './data-view/prices/DC-Price.component';




@NgModule({
  entryComponents: [
    DBInvoiceComponent,
    DCUserComponent,
    DCCustomerComponent,
    DCInvoiceComponent,
    DCPriceComponent,
    DBRequestComponent,
  ],
  declarations: [
    AppComponent,
    SearchOrderComponent,
    HeaderComponent,
    MainViewComponent,
    LoginComponent,
    RequestsViewComponent,
    DBInvoiceComponent,
    DBRequestComponent,
    DCCustomerComponent,
    DCUserComponent,
    DCInvoiceComponent,
    DCPriceComponent,
    SideBarComponent,
    ContextComponent,
    InvoiceViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    PriceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
