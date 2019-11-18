import { CategoryService } from './../shared/category.service';
import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Category } from '../shared/category.model';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {  
  
  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Category(), categoryService)
   }

  ngOnInit() {
    this.paginate(this.page, this.rows, this.sortField, this.sortOrder);
  }
}
