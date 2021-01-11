import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main.page';
import { DetailingPage } from './pages/detailing/detailing.page';
import { DrinksPage } from './pages/drinks/drinks.page';
import { InitalPage } from './pages/initial/initial.page';
import { DetailingResolverService } from './resolvers/detailing-resolver.service';
import { DrinksResolverService } from './resolvers/drinks-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'initial',
      },
      {
        path: 'initial',
        component: InitalPage,
      },
      {
        path: 'drinks/:id',
        component: DrinksPage,
        resolve: { drinks: DrinksResolverService },
      },
      {
        path: 'drink/:id',
        component: DetailingPage,
        resolve: { drink: DetailingResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
