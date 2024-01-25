import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrencyRatesService} from "./services/currency-rates.service";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [],
  providers: [
    CurrencyRatesService
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule {
}
