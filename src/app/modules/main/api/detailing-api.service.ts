import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { IDrink } from '../models/drink.interface';

@Injectable({
  providedIn: 'root',
})
export class DetailingApiService extends ApiService<IDrink> {
  constructor(http: HttpClient, toastr: ToastrService) {
    super(http, 'lookup.php', toastr);
  }
}
