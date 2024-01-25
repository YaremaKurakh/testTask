import { NgModule } from '@angular/core';
import {BackButtonComponent} from "./components/back-button/back-button.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const extModules = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  CommonModule
]

const components = [
  BackButtonComponent,
  FooterComponent,
  HeaderComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...extModules
  ],
  exports: [
    ...components,
    ...extModules
  ]
})
export class SharedModule { }
