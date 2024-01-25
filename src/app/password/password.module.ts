import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordRoutingModule} from "./password-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MainComponent} from "./components/main/main.component";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    PasswordRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class PasswordModule {
}
