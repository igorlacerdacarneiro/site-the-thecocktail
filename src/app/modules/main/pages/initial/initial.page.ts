import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitialFacadeService } from '../../facades/initial-facade.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitalPage implements OnInit {

  select: string;

  constructor(private router: Router, public initalFacade: InitialFacadeService) { }

  ngOnInit(): void { }

  selectFilter(type: string) {
    this.select = type;
    this.initalFacade.selectType(type);
    switch (type) {
      case 'c':
        this.initalFacade.loadCategories({ c: 'list' }).toPromise();
        break;
      case 'g':
        this.initalFacade.loadGlasses({ g: 'list' }).toPromise();
        break;
      case 'i':
        this.initalFacade.loadIngredients({ i: 'list' }).toPromise();
        break;
      default:
        this.initalFacade.loadAlcoholics({ a: 'list' }).toPromise();
        break;
    }
  }

  selectedFilter(item: string) {
    let newItem = item.replace(/\//g, '');
    newItem = newItem.replace(/\s/g, '_');
    switch (this.select) {
      case 'c':
        this.router.navigate([`drinks/c-${newItem}`]);
        break;
      case 'g':
        this.router.navigate([`drinks/g-${newItem}`]);
        break;
      case 'i':
        this.router.navigate([`drinks/i-${newItem}`]);
        break;
      default:
        this.router.navigate([`drinks/a-${newItem}`]);
        break;
    }
  }

  categoriessTrackFn = (i, item) => item.strCategory;

  glassesTrackFn = (i, item) => item.strGlass;

  ingredientsTrackFn = (i, item) => item.strIngredient1;

  alcoholicsTrackFn = (i, item) => item.strAlcoholic;
}
