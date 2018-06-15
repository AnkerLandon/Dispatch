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
  MatTable,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { SearchOrderComponent } from './search/search-order/search-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DataViewComponent } from './data-view/data-view.component';
import { DialogBoxComponent, DialogBoxAddComponent} from './Dialog/Box/dialog-box.component';
import { CommonModule } from '@angular/common';
import { RecordService } from './data-view/record.service';


@NgModule({
  entryComponents: [
    DialogBoxComponent,
    DialogBoxAddComponent
  ],
  declarations: [
    AppComponent,
    SearchOrderComponent,
    HeaderComponent,
    DialogBoxComponent,
    DialogBoxAddComponent,
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
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
