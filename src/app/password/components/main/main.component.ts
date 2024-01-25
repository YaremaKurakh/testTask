import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {BehaviorSubject, debounceTime, map, Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-password-strength',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  password: FormControl;
  private strengthIndicationBS: BehaviorSubject<boolean[]> = new BehaviorSubject<boolean[]>([]);
  strengthIndication$: Observable<string[]> = this.strengthIndicationBS.asObservable().pipe(
    map(value => {
      let indications: string[] = []
      switch (value.length) {
        case 3: {
          indications.push('green', 'green', 'green');
          break;
        }
        case 2: {
          indications.push('yellow', 'yellow', 'gray')
          break;
        }
        case 1: {
          indications.push('red', 'gray', 'gray');
          break;
        }
        case 0:
        default: {
          indications.push('gray', 'gray', 'gray');
          break;
        }
      }
      return indications;
    })
  );

  destroy$ = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initControl();
    this.checkPasswordStrength();
  }

  private initControl() {
    this.password = this.fb.control(null);
  }

  private checkPasswordStrength() {
    const hasLetters = /[a-zA-Z]/
    const hasDigits = /\d/
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/

    this.password.valueChanges
      .pipe(
        debounceTime(500),
        map(value => {
          const strength = []
          if(value.length >= 8) {
            strength.push(true)
          }
          if(hasLetters.test(value) && hasDigits.test(value)) {
            strength.push(true)
          }
          if(hasSymbols.test(value)) {
            strength.push(true);
          }
          return strength
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(strength => {
        this.strengthIndicationBS.next(strength);
      })
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
