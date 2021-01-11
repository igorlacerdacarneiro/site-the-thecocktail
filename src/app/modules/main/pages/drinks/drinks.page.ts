import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { IHeaderOptions } from 'src/app/shared/models/header.interface';
import { DrinksFacadeService } from '../../facades/drinks-facade.service';
import { IDrinks } from '../../models/drinks.interface';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
})
export class DrinksPage implements OnInit {

  subscriptions: Subscription[] = [];
  searchString: FormControl = new FormControl();

  constructor(public drinksFacade: DrinksFacadeService, private router: Router) {
    this.subscriptions.push(
      this.searchString.valueChanges
        .pipe(
          filter((term) => term.length > 1 || term.length === 0),
          debounceTime(400),
          distinctUntilChanged(),
        )
        .subscribe((term) => this.onSearch(term)),
    );
  }

  ngOnInit(): void { }

  get headerOptions(): IHeaderOptions {
    return {
      title: 'Drinks',
      subtitle: 'Selecione para ver mais detalhes',
      titleColor: 'black',
      hideBackButton: false,
    };
  }

  onSelectDrink(drink: IDrinks) {
    console.log(drink)
    this.router.navigate([`drink/${drink.idDrink}`]);
  }

  drinksTrackFn = (i, item) => item.idDrink;

  onSearch(event) {
    this.drinksFacade.search(event);
  }
}
