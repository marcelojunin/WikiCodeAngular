import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
  ]
})
export class CategoriesModule { }
