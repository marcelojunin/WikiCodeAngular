import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Component, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  protected resources: T[] = [];
  constructor(
    protected resourceService: BaseResourceService<T>
  ) { }

  ngOnInit() {
  }

  protected loadAll(): void {
    this.resourceService.getAll()
      .subscribe(
        resp => this.resources = resp.sort((a, b) => b.id - a.id),
        error => console.log(error)
      );
  }

  protected delete(resource: T): void {
    this.resourceService.delete(resource.id)
    .subscribe(
      () => this.resources = this.resources.filter(element => element !== resource), 
      error => console.log(error)
    );
  }

}
