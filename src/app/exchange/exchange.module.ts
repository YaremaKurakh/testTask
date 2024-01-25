import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExchangeRoutingModule} from "./exchange-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MainComponent} from "./components/main/main.component";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    ExchangeRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ExchangeModule {
}
