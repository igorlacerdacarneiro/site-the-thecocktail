import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { InitalPage } from './pages/initial/initial.page';
import { DrinksPage } from './pages/drinks/drinks.page';
import { DetailingPage } from './pages/detailing/detailing.page';
import { CardDrinkComponent } from './components/card-drink/card-drink.component';
import { ModalSharedComponent } from './components/modal-shared/modal-shared.component';
import { ModalEvaluateComponent } from './components/modal-evaluate/modal-evaluate.component';

@NgModule({
  declarations: [
    MainPage,
    InitalPage,
    DrinksPage,
    DetailingPage,
    SideFilterComponent,
    CardDrinkComponent,
    ModalSharedComponent,
    ModalEvaluateComponent
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  exports: [MainPage,
    SideFilterComponent,
    CardDrinkComponent,
    ModalSharedComponent,
    ModalEvaluateComponent
  ],
})
export class MainModule { }
