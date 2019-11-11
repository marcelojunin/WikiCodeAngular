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
  serverErrorMessages: string[] = null;

  constructor(
    protected injector: Injector,
    protected resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit() {
    this.buildForm();
    this.setCurrentAction();
    this.loadResource();
  }

  ngAfterContentChecked () : void {
    

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
      const id = this.activatedRoute.params['value'].id;
      this.resourceService.getById(id)
        .subscribe(resp => {
        this.resource = resp;
        this.formGroup.patchValue(resp);
      }, error => {
        console.log(error)
      })
    }
  }

  protected createResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.formGroup);

    this.resourceService.create(resource)
      .subscribe(
        response => this.actionForSuccess(response),
        error => this.actionForError(error)
      );
  }

  protected updateResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.formGroup);
    const id = this.activatedRoute.queryParamMap['id'];
    this.resourceService.update(resource, id)
      .subscribe(
        response => this.actionForSuccess(response),
        error => this.actionForError(error)
      );
  }

  protected actionForSuccess(resource: T): void {
    //toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.activatedRoute.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    );
  }

  protected actionForError(error: any) {
    //toastr.error('Ocorreu um erro!');

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicacao com servidor.']
    }
  }

  protected back(): void {
    this.router.navigate([`./categories`]);
  }

  protected abstract buildForm(): void;
}
