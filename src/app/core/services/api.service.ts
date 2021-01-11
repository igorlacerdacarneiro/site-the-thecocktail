import { Observable, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { retry, catchError, map, tap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ICrud } from 'src/app/shared/models/crud.interface';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { environment } from '../../../environments/environment';
import { IResponse } from 'src/app/shared/models/response.interface';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> implements ICrud<T> {
  public URL: string;

  constructor(
    private http: HttpClient,
    @Inject('API_END_POINT') private endpoint: string,
    private toastr?: ToastrService,
  ) {
    this.URL = environment.API_URL;
  }

  public list(
    params = {},
    intercept: boolean = true,
    format: boolean = true,
    reqRetry: number = 0,
  ): Observable<T[]> {
    let headers;
    if (!intercept) headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    return this.http
      .get<IResponse<T[]>>(`${this.URL}/${this.endpoint}?`, {
        headers,
        params,
      })
      .pipe(
        take(1),
        map((data: IResponse<T[]>) => (format ? data?.drinks : data)),
        retry(reqRetry),
        catchError(this.handleError.bind(this)),
      );
  }

  private handleError(err) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = err.message;
      this.toastr.error(errorMessage);
    } else {
      // Get server-side error
      const { error } = err.msg;
      errorMessage = error;
      this.toastr.error(errorMessage);
    }
    return throwError(errorMessage);
  }
}
