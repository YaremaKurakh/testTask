import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MainComponent} from "./components/main/main.component";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class HomeModule {
}
