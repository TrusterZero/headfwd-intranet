import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";



const baseUrl = 'http://localhost:3000/';

export enum Resource {
  Categories = 'categories',
  Pages = 'pages',

}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(resource: Resource): Observable<Object> {
    return this.http.get(baseUrl + resource);
  }

  put(resource: Resource, body): Observable<Object> {
    return this.http.put(baseUrl + resource, body);
  }

  post(resource: Resource, body): Observable<Object> {
    return this.http.post(baseUrl + resource, body);
  }

  delete(resource: Resource, body): Observable<Object> {
    return this.http.delete(baseUrl + resource, body);
  }
}
