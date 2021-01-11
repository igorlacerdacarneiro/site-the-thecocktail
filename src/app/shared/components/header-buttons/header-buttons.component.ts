import { Component, OnInit, Input } from '@angular/core';
import { IButton } from '../../models/button.interface';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
})
export class HeaderButtonsComponent implements OnInit {
  @Input() buttons: IButton[];

  ngOnInit(): void {}

  constructor(private headerService: HeaderService) {}

  onClick(button: IButton) {
    this.headerService.buttonTrigger.next(button);
  }
}
