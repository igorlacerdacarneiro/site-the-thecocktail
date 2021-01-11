import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DetailingApiService } from '../api/detailing-api.service';
import { IDrink } from '../models/drink.interface';
import { DetailingStateService } from '../states/detailing-state.service';

@Injectable({
    providedIn: 'root',
})
export class DetailingFacadeService {
    constructor(private api: DetailingApiService, public state: DetailingStateService) { }

    get drink$(): Observable<IDrink> {
        return this.state.drink$;
    }

    get drink(): IDrink {
        return this.state.drink;
    }

    loadDrink(query = {}) {
        const queryString = { ...query };
        return this.api.list(queryString).pipe(
            tap((drinks: IDrink[]) => {
                const [drink] = drinks;
                this.state.drink = drink;
                console.log(this.state.drink)
            }),
        );
    }
}
