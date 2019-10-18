import { Injector } from '@angular/core';
import { BaseResourceModel } from './../models/base-resource.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient

  constructor(
    protected apiPath: string,
    protected injector: Injector
  ) { 
    this.http = injector.get(HttpClient);
  }
  
  public getAll(): Observable<T[]> {
    return this.http.get(this.apiPath)
      .pipe(
        map(this.jsonDataToResources),
        catchError(this.handlerError)
      );
  }

  public getById(id: number): Observable<T> {
    return this.http.get(`${this.apiPath}/${id}`)
    .pipe(
      map(this.jsonDataToResources),
      catchError(this.handlerError)
    );
  }

  public create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource)
    .pipe(
      map(this.jsonDataToResources),
      catchError(this.handlerError)
    );
  }

  public update(resource: T, id: number): Observable<T> {
    return this.http.put(`${this.apiPath}/${id}`, resource)
    .pipe(
      map(() => null),
      catchError(this.handlerError)
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handlerError),
      map(() => null)
    );
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(el => resources.push(el as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  protected handlerError(error: any): Observable<any> {
    return throwError(error);
  }
}
