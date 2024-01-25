import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {Routing} from "./core/enums/routing.enum";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: Routing.Home,
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: Routing.CurrencyExchange,
        loadChildren: () => import('./exchange/exchange.module').then(m => m.ExchangeModule)
      },
      {
        path: Routing.PasswordStrength,
        loadChildren: () => import('./password/password.module').then(m => m.PasswordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
