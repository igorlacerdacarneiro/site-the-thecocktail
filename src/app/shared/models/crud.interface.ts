import { Observable } from 'rxjs';

export interface ICrud<T> {
  create(body: T, intercept: boolean, format: boolean, reqRetry: number): Observable<T>;
  read(
    id: number,
    intercept: boolean,
    params: Object,
    format: boolean,
    reqRetry: number,
  ): Observable<T[]>;
  update(id: number, body: T, intercept: boolean, format: boolean, reqRetry: number): Observable<T>;
  delete(id: number | Array<string>, intercept: boolean, reqRetry: number): Observable<{}>;
  list(
    offset: number,
    limit: number,
    intercept: boolean,
    params: object,
    format: boolean,
    reqRetry: number,
  ): Observable<T[]>;
}
