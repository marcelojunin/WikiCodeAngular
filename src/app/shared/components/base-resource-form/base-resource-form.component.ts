import { BaseResourceService } from './../../services/base-resource.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AfterContentChecked, OnInit, Injector } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked  {

  currentAction: string;
  formGroup: FormGroup;

  protected activatedRoute: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    protected resource: T,
    protected resourceService: BaseResourceService<T>,
    protected josnDataToResourceFn: (jsonData) => T
  ) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit() {
    this.buildForm();
  }

  ngAfterContentChecked () : void {
    
    this.setCurrentAction();
  }

  public submitForm(): void {
    if (this.currentAction === 'new') {
      
    }
  }

  protected setCurrentAction(): void {
    if (this.activatedRoute.url['value'][0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource(): void {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap.pipe(
        switchMap(param => this.resourceService.getById(+param.get('id')))
      ).subscribe(resp => {
        this.resource = resp;
        this.formGroup.patchValue(resp);
      }, error => {
        console.log(error)
      })
    }
  }

  protected createResource(): void {
    console.log(this.formGroup.value);
  }

  protected abstract buildForm(): void;
}
