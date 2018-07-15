import { Injectable } from '@angular/core';
import { Price } from '../../models/price-data.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PriceService {

  public prices: Price[] = [];
  private price: Price;
  private mapPrice: Price;

  private priceUpdate = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  getPrices() {
    this.http.get<{documents}> ('http://localhost:3000/api/price')
    .pipe(map((priceData) => {
      return priceData.documents.map(price => {
        this.mapPrice = price;
        return this.mapPrice;
      });
    }))
    .subscribe(transPrices => {
      this.prices = transPrices;
      console.log('prices', this.prices);
      this.priceUpdate.next([...this.prices]);
    });
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

  getTax (taxableAmount: number) {
    return +(taxableAmount * (this.getMostRecentPrice().tax / 100)).toFixed(2) ;
  }
}
