import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlcoholic } from '../models/alcoholic.interface';
import { ICategory } from '../models/category.interface';
import { IGlass } from '../models/glass.interface';
import { IIngredient } from '../models/ingredient.interface';

@Injectable({
  providedIn: 'root',
})
export class InitialStateService {
  private readonly _categories = new BehaviorSubject<ICategory[]>([]);
  private readonly _glasses = new BehaviorSubject<IGlass[]>([]);
  private readonly _ingredients = new BehaviorSubject<IIngredient[]>([]);
  private readonly _alcoholics = new BehaviorSubject<IAlcoholic[]>([]);
  private readonly _selected = new BehaviorSubject<string>('');

  get categories(): ICategory[] {
    return this._categories.getValue();
  }

  public get categories$(): Observable<ICategory[]> {
    return this._categories.asObservable();
  }

  set categories(val: ICategory[]) {
    this._categories.next(val);
  }

  get glasses(): IGlass[] {
    return this._glasses.getValue();
  }

  public get glasses$(): Observable<IGlass[]> {
    return this._glasses.asObservable();
  }

  set glasses(val: IGlass[]) {
    this._glasses.next(val);
  }

  get ingredients(): IIngredient[] {
    return this._ingredients.getValue();
  }

  public get ingredients$(): Observable<IIngredient[]> {
    return this._ingredients.asObservable();
  }

  set ingredients(val: IIngredient[]) {
    this._ingredients.next(val);
  }

  get alcoholics(): IAlcoholic[] {
    return this._alcoholics.getValue();
  }

  public get alcoholics$(): Observable<IAlcoholic[]> {
    return this._alcoholics.asObservable();
  }

  set alcoholics(val: IAlcoholic[]) {
    this._alcoholics.next(val);
  }

  get selected(): string {
    return this._selected.getValue();
  }

  public get selected$(): Observable<string> {
    return this._selected.asObservable();
  }

  set selected(val: string) {
    this._selected.next(val);
  }

  public selectedType(type: string) {
    this.selected = type;
  }
}
