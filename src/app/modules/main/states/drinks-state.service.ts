import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDrinks } from '../models/drinks.interface';

@Injectable({
  providedIn: 'root',
})
export class DrinksStateService {
  private readonly _drinks = new BehaviorSubject<IDrinks[]>([]);
  private readonly _drinksAux = new BehaviorSubject<IDrinks[]>([]);
  private readonly _selectedDrinkId = new BehaviorSubject<string>(null);

  get drinks(): IDrinks[] {
    return this._drinks.getValue();
  }

  public get drinks$(): Observable<IDrinks[]> {
    return this._drinks.asObservable();
  }

  set drinks(val: IDrinks[]) {
    this._drinks.next(val);
  }

  get drinksAux(): IDrinks[] {
    return this._drinksAux.getValue();
  }

  public get drinksAux$(): Observable<IDrinks[]> {
    return this._drinksAux.asObservable();
  }

  set drinksAux(val: IDrinks[]) {
    this._drinksAux.next(val);
  }

  get selectedDrinkId(): string {
    return this._selectedDrinkId.getValue();
  }

  public get selectedDrinkId$(): Observable<string> {
    return this._selectedDrinkId.asObservable();
  }

  set selectedDrinkId(val: string) {
    this._selectedDrinkId.next(val);
  }

  public selectDrinkId(idDrink: string) {
    this.selectedDrinkId = idDrink;
  }

  public getByName(name: string) {
    return this.drinks.filter((drink) => {
      const userName = drink.strDrink.toLowerCase();
      const hasUser = userName.includes(name.toLowerCase());
      return hasUser;
    });
  }
}
