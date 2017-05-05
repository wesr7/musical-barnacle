import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AUTH_PROVIDERS, AuthHttp } from 'angular2-jwt';
import { myConfig }        from '../auth.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

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
  getSignedRequest(file): Promise<any> {
    return this.http.get(`/api/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    .toPromise()
    .then(res => {
      let response = res.json()
      this.uploadFile(response.signedRequest, file)
    })
   .catch(this.handleError);
  }
    uploadFile(signedRequest, file) {
      console.log(signedRequest);
      return this.http.put(signedRequest, file, this.options);
    }
}
