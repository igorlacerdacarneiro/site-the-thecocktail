import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DetailingFacadeService } from '../facades/detailing-facade.service';
import { IDrink } from '../models/drink.interface';

@Injectable({
    providedIn: 'root',
})
export class DetailingResolverService implements Resolve<IDrink[]> {

    constructor(private detailingFacade: DetailingFacadeService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const { id } = route.params;
        return this.detailingFacade.loadDrink({ i: id });
    }
}
