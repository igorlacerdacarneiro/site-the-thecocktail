import { Observable, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { retry, catchError, map, tap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ICrud } from 'src/app/shared/models/crud.interface';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { IResponse } from '../../shared/models/response.interface';
import { environment } from '../../../environments/environment';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> implements ICrud<T> {
  public URL: string;
  private _count = 0;
  private _limit = 5;
  private _offset = 0;

  constructor(
    private http: HttpClient,
    @Inject('API_END_POINT') private endpoint: string,
    private toastr?: ToastrService,
  ) {
    this.URL = environment.API_URL;
  }

  set count(count: number) {
    this._count = count;
  }

  get count(): number {
    return this._count;
  }

  set limit(limit: number) {
    this._limit = limit;
  }

  get limit(): number {
    return this._limit;
  }

  set offset(offset: number) {
    this._offset = offset;
  }

  get offset(): number {
    return this._offset;
  }

  public create(
    body: T,
    intercept: boolean = true,
    format: boolean = true,
    reqRetry: number = 0,
  ): Observable<T> {
    let headers;
    if (!intercept) headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    return this.http
      .post<IResponse<T>>(`${this.URL}/${this.endpoint}`, body, { headers })
      .pipe(
        take(1),
        tap((data: IResponse<T>) => this.toastr.success(data.msg)),
        map((data: IResponse<T>) => (format ? data.data : data)),
        retry(reqRetry),
        catchError(this.handleError.bind(this)),
      );
  }

  public read(
    id: number,
    intercept: boolean = true,
    params = {},
    format: boolean = true,
    reqRetry: number = 0,
  ): Observable<T[]> {
    let headers;
    if (!intercept) headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    return this.http
      .get<IResponse<T>>(`${this.URL}/${this.endpoint}/${id}`, {
        headers,
        params,
      })
      .pipe(
        take(1),
        tap((data: IResponse<T>) => this.toastr.success(data.msg)),
        map((data: IResponse<T>) => (format ? data.data.rows : data)),
        retry(reqRetry),
        catchError(this.handleError.bind(this)),
      );
  }

  public update(
    id: number,
    body: T,
    intercept: boolean = true,
    format: boolean = true,
    reqRetry: number = 0,
  ): Observable<T> {
    let headers;
    if (!intercept) headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    return this.http
      .put<IResponse<T>>(`${this.URL}/${this.endpoint}/${id}`, body, {
        headers,
      })
      .pipe(
        take(1),
        tap((data: IResponse<T>) => this.toastr.success(data.msg)),
        map((data: IResponse<T>) => (format ? data.data : data)),
        retry(reqRetry),
        catchError(this.handleError.bind(this)),
      );
  }

  public delete(
    id: number | Array<string>,
    intercept: boolean = true,
    reqRetry: number = 0,
  ): Observable<{}> {
    let headers;
    let payload: any = new HttpParams();

    if (!intercept) headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    if (typeof id === 'number') payload = { body: { ids: [id] } };
    else payload = { body: { ids: id }, headers };

    return this.http.delete<IResponse<T>>(`${this.URL}/${this.endpoint}`, payload).pipe(
      take(1),
      tap((data: any) => this.toastr.success(data.msg)),
      retry(reqRetry),
      catchError(this.handleError.bind(this)),
    );
  }

  public list(
    offset: number = this.offset,
    limit: number = this.limit,
    intercept: boolean = true,
    params = {},
    format: boolean = true,
    reqRetry: number = 0,
  ): Observable<T[]> {
    let headers;
    if (!intercept) headers = new HttpHeaders().set(InterceptorSkipHeader, '');

    return this.http
      .get<IResponse<T[]>>(`${this.URL}/${this.endpoint}?offset=${offset}&limit=${limit}`, {
        headers,
        params,
      })
      .pipe(
        take(1),
        tap((data: IResponse<T[]>) => {
          this.count = data.data.count;
          return this.toastr.success(data.msg);
        }),
        map((data: IResponse<T[]>) => (format ? data?.data?.rows : data)),
        retry(reqRetry),
        catchError(this.handleError.bind(this)),
      );
  }

  public search(
    name: string,
    intercept: boolean = false,
    additionalParams = {},
    format: boolean = true,
    reqRetry: number = 0,
  ): Observable<T[]> {
    let headers;
    if (!intercept) headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    const params = { ...additionalParams };

    return this.http
      .get<IResponse<T[]>>(`${this.URL}/${this.endpoint}?search=${name}`, {
        headers,
        params,
      })
      .pipe(
        take(1),
        map((data: IResponse<T[]>) => (format ? data?.data?.rows : data)),
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
