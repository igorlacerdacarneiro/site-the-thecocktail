import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Modal } from 'src/app/shared/models/modal.interface';
import { IDrink } from '../../models/drink.interface';

@Component({
  selector: 'app-modal-evaluate',
  templateUrl: './modal-evaluate.component.html',
  styleUrls: ['./modal-evaluate.component.scss'],
})
export class ModalEvaluateComponent implements OnInit {

  @Input() drink: IDrink;
  @Output() closeEventEmitter = new EventEmitter();

  currentRate = 5;

  constructor() { }

  ngOnInit(): void { }

  get modalSettings(): Modal {
    return {
      title: 'Avaliar',
      subtitle: 'Seleciona abaixo a sua avalição',
      btnText: 'Avaliar',
    };
  }

  close() {
    this.closeEventEmitter.emit();
  }
}
