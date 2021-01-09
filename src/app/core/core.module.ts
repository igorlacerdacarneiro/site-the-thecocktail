import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { QuicklinkModule } from 'ngx-quicklink';

import { LoaderComponent } from './components/loader/loader.component';
import { ToastrService } from './services/toastr.service';
import { LoadInterceptor } from './interceptors/load.interceptor';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, ToastrModule.forRoot(), HttpClientModule, QuicklinkModule],
  exports: [LoaderComponent, QuicklinkModule],
  providers: [
    ToastrService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi instanciado. Importe-o somente em AppModule.');
    }
  }
}
