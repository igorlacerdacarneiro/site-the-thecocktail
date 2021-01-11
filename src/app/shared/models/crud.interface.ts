import { Observable } from 'rxjs';

export interface ICrud<T> {
  list(
    params: object,
    intercept: boolean,
    format: boolean,
    reqRetry: number,
  ): Observable<T[]>;
}
