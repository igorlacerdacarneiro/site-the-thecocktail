import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchComponent, PaginationComponent, TopMenuComponent, LogoutComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [ReactiveFormsModule, SearchComponent, PaginationComponent, TopMenuComponent, LogoutComponent],
})
export class SharedModule { }
