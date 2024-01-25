import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyRatesService} from "../../../core/services/currency-rates.service";
import {debounceTime, map, Observable, Subject, takeUntil, tap} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CurrencyRatesList} from "../../../core/interfaces/currency-rates-list.interface";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isCurrencies$!: Observable<boolean>
  exchangeRates: CurrencyRatesList;
  form: FormGroup

  destroy$= new Subject();

  constructor(private currentCurrencyRateService: CurrencyRatesService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initCurrencies();
    this.initForm();
  }

  private initCurrencies() {
    this.isCurrencies$ = this.currentCurrencyRateService.getCurrentCurrencyRate().pipe(
      tap(res => this.exchangeRates = res),
      map(res => !!res)
    )
  }

  private initForm() {
    this.form = this.fb.group({
      leftAmount: this.fb.control(null),
      leftCurrency: this.fb.control(null),
      rightAmount: this.fb.control(null),
      rightCurrency: this.fb.control(null)
    })

    const leftAmount = this.form.get('leftAmount');
    const rightAmount = this.form.get('rightAmount');

    leftAmount?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        tap(() => rightAmount?.patchValue(null, {emitEvent: false}))
      )
      .subscribe();

    rightAmount?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        tap(() => leftAmount?.patchValue(null, {emitEvent: false}))
      )
      .subscribe()
  }

  convert() {
    const rateFrom = this.exchangeRates[this.form.get('leftCurrency')?.value];
    const rateTo = this.exchangeRates[this.form.get('rightCurrency')?.value];
    const leftAmount = this.form.get('leftAmount')?.value;
    const rightAmount = this.form.get('rightAmount')?.value;

    if (rightAmount) {
      const value = parseFloat(((rightAmount * rateTo) / rateFrom).toFixed(2));
      this.form.get('leftAmount')?.patchValue(value, {emitEvent: false});
    }
    if (leftAmount) {
      const value = parseFloat(((leftAmount * rateFrom) / rateTo).toFixed(2));
      this.form.get('rightAmount')?.patchValue(value, {emitEvent: false});
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
