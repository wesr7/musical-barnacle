import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';

import { DataService } from '../services/data.service';

@Component({
        selector: 'admin-panel',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.scss']

})

export class AdminComponent implements OnInit {
        products = [];
        isLoading = true;

        product = {};
        isDetails = false;

        constructor(private http: Http,
              private dataService: DataService,
              private auth: Auth) { }

        ngOnInit() {
                this.getProducts();
        }
         getProducts() {
                this.dataService.getProducts().subscribe(
                        data => this.products = data,
                        () => this.isLoading = false
                );
                this.isDetails = false
        }
         getProduct(product) {
                 this.dataService.getProduct(product).subscribe(
                         data => product = JSON.parse(data._body)
                )
                this.product = product;
                this.isDetails = true
        }


}