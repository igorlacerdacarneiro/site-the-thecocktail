import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDrink } from '../models/drink.interface';

@Injectable({
  providedIn: 'root',
})
export class DetailingStateService {
  private readonly _drink = new BehaviorSubject<IDrink>(null);

  get drink(): IDrink {
    return this._drink.getValue();
  }

  public get drink$(): Observable<IDrink> {
    return this._drink.asObservable();
  }

  set drink(val: IDrink) {
    this._drink.next(val);
  }
}
