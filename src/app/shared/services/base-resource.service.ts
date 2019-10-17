import { BaseResourceModel } from './../models/base-resource.model';
import { HttpClient } from '@angular/common/http';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient

  constructor() { }
}
