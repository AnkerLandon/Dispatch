import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
  MatTooltipModule,
  MatDialogModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { SearchOrderComponent } from './search/search-order/search-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DataViewComponent } from './data-view/data-view.component';
import { DialogBoxComponent, DialogBoxEditComponent } from './Dialog/Box/dialog-box.component';
import { CommonModule } from '@angular/common';

@NgModule({
  entryComponents: [
    DialogBoxComponent,
    DialogBoxEditComponent
  ],
  declarations: [
    AppComponent,
    SearchOrderComponent,
    HeaderComponent,
    DialogBoxComponent,
    DialogBoxEditComponent,
    DataViewComponent
  ],
  imports: [
    BrowserModule,
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
