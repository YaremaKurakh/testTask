import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CurrencyRate} from "../interfaces/currency-rate.interface";
import {CurrencyRatesList} from "../interfaces/currency-rates-list.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyRatesService {

  exchangeRates: CurrencyRatesList = {
    "UAH": 1
  };

  constructor(private http: HttpClient) { }

  getCurrentCurrencyRate():Observable<CurrencyRatesList> {
    return this.http.get<CurrencyRate[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
      .pipe(map((res: CurrencyRate[]) => {
        res.forEach((currency) => {
          const { cc, rate } = currency;
          this.exchangeRates[cc] = parseFloat(rate.toFixed(2));
        });
        return this.exchangeRates;
      }))
  }
}
