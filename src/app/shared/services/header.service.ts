import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IButton } from 'src/app/shared/models/button.interface';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public buttonTrigger: Subject<IButton> = new Subject();
}
