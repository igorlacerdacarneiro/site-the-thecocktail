import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDrinks } from '../../models/drinks.interface';

@Component({
  selector: 'app-card-drink',
  templateUrl: './card-drink.component.html',
  styleUrls: ['./card-drink.component.scss'],
})
export class CardDrinkComponent implements OnInit {
  @Input() drink: IDrinks;
  @Output() clickTrigger: EventEmitter<IDrinks> = new EventEmitter<IDrinks>();
  image = './../../../../assets/images/image-default-clients.jpg';

  ngOnInit(): void {}

  onClick() {
    this.clickTrigger.emit(this.drink);
  }
}
