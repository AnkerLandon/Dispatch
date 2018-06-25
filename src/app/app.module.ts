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
  MatSelectModule,
  MatCheckboxModule,
  MatFormFieldControl,
  MatFormFieldModule,
  MatRadioButton,
  MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { SearchOrderComponent } from './search/search-order/search-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './nav/header/header.component';
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
import { SideBarComponent } from './nav/side-bar/side-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContextComponent } from './nav/context/context.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RequestsViewComponent } from './request/requests-view.component';
import { DBRequestComponent } from './request/DB-Request.component';



@NgModule({
  entryComponents: [
    DBCustomerComponent,
    DBInvoiceComponent,
    DCCustomerComponent,
    DCInvoiceComponent,
    DBRequestComponent,
  ],
  declarations: [
    AppComponent,
    SearchOrderComponent,
    HeaderComponent,
    RequestsViewComponent,
    DBCustomerComponent,
    DBInvoiceComponent,
    DBRequestComponent,
    DCCustomerComponent,
    DCInvoiceComponent,
    CustomerViewComponent,
    SideBarComponent,
    ContextComponent,
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
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    CommonModule,
    MatSelectModule,
    HttpClientModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [CustomerService, InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
