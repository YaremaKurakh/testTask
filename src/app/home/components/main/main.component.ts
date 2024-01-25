import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Routing} from "../../../core/enums/routing.enum";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  routing = Routing

  constructor(private router: Router) {
  }

  navigate(path: string) {
    this.router.navigate(['/', path]);
  }
}
