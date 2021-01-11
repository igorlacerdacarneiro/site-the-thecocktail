import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeaderButtonsComponent } from './components/header-buttons/header-buttons.component';

@NgModule({
  declarations: [
    PaginationComponent,
    TopMenuComponent,
    LogoutComponent,
    HeaderComponent,
    HeaderButtonsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    ReactiveFormsModule,
    PaginationComponent,
    TopMenuComponent,
    LogoutComponent,
    HeaderComponent,
    HeaderButtonsComponent,
  ],
})
export class SharedModule { }
