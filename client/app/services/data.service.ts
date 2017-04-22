import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AUTH_PROVIDERS, AuthHttp } from 'angular2-jwt';
import { myConfig }        from '../auth.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getProducts(): Observable<any> {
    return this.http.get('/api/products').map(res => res.json());
  }

  countProducts(): Observable<any> {
    return this.http.get('/api/products/count').map(res => res.json());
  }

  addProduct(product): Observable<any> {
    return this.http.post('/api/product', JSON.stringify(product), this.options);
  }

  getProduct(product): Observable<any> {
    return this.http.get(`/api/product/${product._id}`, this.options);
  }

  editProduct(product): Observable<any> {
    return this.http.put(`/api/product/${product._id}`, JSON.stringify(product), this.options);
  }

  deleteProduct(product): Observable<any> {
    return this.http.delete(`/api/product/${product._id}`, this.options);
  }
}
