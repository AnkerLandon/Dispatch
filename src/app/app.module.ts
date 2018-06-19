import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  MatSelectModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { SearchOrderComponent } from './search/search-order/search-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { CustomerViewComponent } from './data-view/customers/customer-view.component';
import { DBCustomerComponent} from './data-view/customers/DB-Customer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DCCustomerComponent } from './data-view/customers/DC-Customer.component';
import { DCInvoiceComponent } from './data-view/invoices/DC-Invoice.component';
import { InvoiceViewComponent } from './data-view/invoices/invoice-view.component';
import { CustomerService } from './data-view/customers/customer.service';
import { InvoiceService } from './data-view/invoices/invoice.service';
import { DBInvoiceComponent } from './data-view/invoices/DB-Invoices.component';



@NgModule({
  entryComponents: [
    DBCustomerComponent,
    DBInvoiceComponent,
    DCCustomerComponent,
    DCInvoiceComponent
  ],
  declarations: [
    AppComponent,
    SearchOrderComponent,
    HeaderComponent,
    DBCustomerComponent,
    DBInvoiceComponent,
    DCCustomerComponent,
    DCInvoiceComponent,
    CustomerViewComponent,
    InvoiceViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    CommonModule,
    MatSelectModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [CustomerService, InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
