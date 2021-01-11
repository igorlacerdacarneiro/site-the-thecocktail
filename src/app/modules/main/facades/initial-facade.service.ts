import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InitialApiService } from '../api/initial-api.service';
import { IAlcoholic } from '../models/alcoholic.interface';
import { ICategory } from '../models/category.interface';
import { IGlass } from '../models/glass.interface';
import { IIngredient } from '../models/ingredient.interface';
import { InitialStateService } from '../states/initial-state.service';

@Injectable({
    providedIn: 'root',
})
export class InitialFacadeService {
    constructor(private api: InitialApiService, public state: InitialStateService) { }

    get categories$(): Observable<ICategory[]> {
        return this.state.categories$;
    }

    get glasses$(): Observable<IGlass[]> {
        return this.state.glasses$;
    }

    get ingredients$(): Observable<IIngredient[]> {
        return this.state.ingredients$;
    }

    get alcoholics$(): Observable<IAlcoholic[]> {
        return this.state.alcoholics$;
    }

    loadCategories(query = {}) {
        const queryString = { ...query };
        return this.api.list(queryString).pipe(
            tap((categories: ICategory[]) => {
                this.state.categories = categories;
            }),
        );
    }

    loadGlasses(query = {}) {
        const queryString = { ...query };
        return this.api.list(queryString).pipe(
            tap((glasses: IGlass[]) => {
                this.state.glasses = glasses;
            }),
        );
    }

    loadIngredients(query = {}) {
        const queryString = { ...query };
        return this.api.list(queryString).pipe(
            tap((ingredients: IIngredient[]) => {
                this.state.ingredients = ingredients;
            }),
        );
    }

    loadAlcoholics(query = {}) {
        const queryString = { ...query };
        return this.api.list(queryString).pipe(
            tap((alcoholics: IAlcoholic[]) => {
                this.state.alcoholics = alcoholics;
            }),
        );
    }

    get selectedType(): string {
        return this.state.selected;
    }

    selectType(type: string) {
        this.state.selectedType(type);
    }
}
