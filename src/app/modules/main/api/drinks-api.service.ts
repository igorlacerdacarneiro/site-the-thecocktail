import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { IDrinks } from '../models/drinks.interface';

@Injectable({
  providedIn: 'root',
})
export class DrinksApiService extends ApiService<IDrinks> {
  constructor(http: HttpClient, toastr: ToastrService) {
    super(http, 'filter.php', toastr);
  }
}
