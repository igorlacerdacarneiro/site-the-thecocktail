import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss'],
})
export class SideFilterComponent implements OnInit {

  select: string;
  @Output() selectEventEmitter = new EventEmitter();

  constructor(public router: Router) {}

  ngOnInit(): void {}

  submit(type: string) {
    this.select = type;
    this.selectEventEmitter.emit(type);
  }
}
