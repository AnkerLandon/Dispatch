import { Injectable } from '@angular/core';
import { Price } from '../../models/price-data.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PriceService {

  private prices: Price[] = [];
  private price: Price;

  private priceUpdate = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { this.getPrices(); }

  getPrices() {
    this.http.get<{documents}> ('http://localhost:3000/api/price')
    .pipe(map((priceData) => {
      return priceData.documents.map(price => {
        return {
          _id: price._id,
          pickup: price.pickup,
          date: price.date,
          cow: price.cow,
          horse: price.horse,
          tax: price.tax,
          subscription: price.subscription
        };
      });
    }))
    .subscribe(transPrices => {
      this.prices = transPrices;
      console.log('flag 1');
      this.priceUpdate.next([...this.prices]);
    });
    this.priceUpdate.next([...this.prices]);
  }

  getPricesUpdateListener() {
    return this.priceUpdate.asObservable();
  }

  newPrice(newPriceData: Price) {
    this.http.post('http://localhost:3000/api/price/new', newPriceData)
    .subscribe((response) => {
      console.log(response);
      this.getPrices();
    });
  }

  getMostRecentPrice() {
    console.log('price length', this.prices , this.prices.length);
    return this.prices[this.prices.length - 1];
  }

  getPickupPrice() {
    return this.getMostRecentPrice().pickup ;
  }
}
