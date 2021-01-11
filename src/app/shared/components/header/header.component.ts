import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IHeaderOptions } from '../../models/header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerOptions: IHeaderOptions;
  @Input() titleComplement: string;

  constructor(
    private location: Location) { }

  ngOnInit(): void { }

  back() {
    this.location.back();
  }
}
