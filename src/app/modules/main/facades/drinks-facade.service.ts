import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DrinksApiService } from '../api/drinks-api.service';
import { IDrinks } from '../models/drinks.interface';
import { DrinksStateService } from '../states/drinks-state.service';

@Injectable({
    providedIn: 'root',
})
export class DrinksFacadeService {
    constructor(private api: DrinksApiService, public state: DrinksStateService) { }

    get drinks$(): Observable<IDrinks[]> {
        return this.state.drinks$;
    }

    loadDrinks(query = {}) {
        const queryString = { ...query };
        return this.api.list(queryString).pipe(
            tap((drinks: IDrinks[]) => {
                this.state.drinks = drinks;
                this.state.drinksAux = drinks;
            }),
        );
    }

    selectDrinkId(idDrink: string) {
        this.state.selectDrinkId(idDrink);
    }

    search(searchTerm: string) {
        if (!searchTerm){
            this.state.drinks = this.state.drinksAux;
            return
        }
        this.state.drinks = this.state.getByName(searchTerm);
      }
}
