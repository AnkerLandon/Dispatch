import { Injectable } from '@angular/core';
import { Price } from '../../models/price-data.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/price';


@Injectable({providedIn: 'root'})
export class PriceService {

  public prices: Price[] = [];
  private mapPrice: Price;

  private priceUpdate = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  getPrices() {
    this.http.get<{documents}> (BACKEND_URL)
    .pipe(map((priceData) => {
      return priceData.documents.map(price => {
        this.mapPrice = price;
        return this.mapPrice;
      });
    }))
    .subscribe(transPrices => {
      this.prices = transPrices;
      this.priceUpdate.next([...this.prices]);
    });
  }

  getPricesUpdateListener() {
    return this.priceUpdate.asObservable();
  }

  newPrice(newPriceData: Price) {
    this.http.post(BACKEND_URL + '/new', newPriceData)
    .subscribe((response) => {
      this.getPrices();
    });
  }

  getMostRecentPrice() {
    return this.prices[this.prices.length - 1];
  }

  getPickupPrice() {
    return this.getMostRecentPrice().pickup ;
  }

  getTax (taxableAmount: number) {
    return +(taxableAmount * (this.getMostRecentPrice().tax / 100)).toFixed(2) ;
  }
}
