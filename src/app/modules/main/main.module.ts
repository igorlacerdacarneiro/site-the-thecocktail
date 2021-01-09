import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';

@NgModule({
  declarations: [MainPage],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  exports: [MainPage],
})
export class MainModule {}
