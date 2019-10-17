import { BaseResourceService } from './../../services/base-resource.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base-resource-form',
  templateUrl: './base-resource-form.component.html',
  styleUrls: ['./base-resource-form.component.css']
})
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit {

  formGroup: FormGroup;

  protected activatedRoute: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected josnDataToResourceFn: (jsonData) => T
  ) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit() {
  }

}
