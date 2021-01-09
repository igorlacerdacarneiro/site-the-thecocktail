import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { delay, finalize } from 'rxjs/operators';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class LoadInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);

      return next.handle(req.clone({ headers }));
    }
    this.loaderService.show();
    return next.handle(req).pipe(
      delay(200),
      finalize(() => this.loaderService.hide()),
    );
  }
}
