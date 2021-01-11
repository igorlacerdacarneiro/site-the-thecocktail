import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { IAlcoholic } from '../models/alcoholic.interface';
import { ICategory } from '../models/category.interface';
import { IGlass } from '../models/glass.interface';
import { IIngredient } from '../models/ingredient.interface';

@Injectable({
  providedIn: 'root',
})
export class InitialApiService extends ApiService<ICategory | IGlass | IIngredient | IAlcoholic > {
  constructor(http: HttpClient, toastr: ToastrService) {
    super(http, 'list.php', toastr);
  }
}
