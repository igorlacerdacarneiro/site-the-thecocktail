import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DrinksFacadeService } from '../facades/drinks-facade.service';
import { IDrinks } from '../models/drinks.interface';

@Injectable({
    providedIn: 'root',
})
export class DrinksResolverService implements Resolve<IDrinks[]> {
    constructor(private drinksFacade: DrinksFacadeService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const { id } = route.params;
        const type = id.split('-');
        switch (type[0]) {
            case 'c':
                return this.drinksFacade.loadDrinks({ c: type[1] });
            case 'g':
                return this.drinksFacade.loadDrinks({ g: type[1] });
            case 'i':
                return this.drinksFacade.loadDrinks({ i: type[1] });
            default:
                return this.drinksFacade.loadDrinks({ a: type[1] });
        }
    }
}
