import {Component, OnInit} from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import {filter, map, Observable} from "rxjs";
import {CurrencyRatesService} from "../../../core/services/currency-rates.service";
import {CurrencyRatesList} from "../../../core/interfaces/currency-rates-list.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  exchangeRates$!: Observable<CurrencyRatesList>;

  isMainPage$!: Observable<boolean>;
  isCurrencyPage$!: Observable<boolean>;
  constructor(private router: Router,
              private currentCurrencyRateService: CurrencyRatesService) {
  }

  ngOnInit() {
    this.initMainPage()
    this.initCurrenciesPage()
  }

  private initMainPage() {
    this.isMainPage$ = this.router.events.pipe(
      filter(res => {
        return res instanceof NavigationEnd
      }),
      map(res => {
      return (res as NavigationEnd)?.url === '/'
    }))
  }

  private initCurrenciesPage() {
    this.isCurrencyPage$ = this.router.events.pipe(
      filter(res => {
        return res instanceof NavigationEnd
      }),
      map(res => {
        return (res as NavigationEnd)?.url === '/main'
      }))

    this.exchangeRates$ = this.currentCurrencyRateService.getCurrentCurrencyRate()
  }
}
