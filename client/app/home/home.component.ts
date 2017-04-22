import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

stage_company_options = ['Utility Filed', 'Utility Issued', 'Design Filed', 'Design Issued', 'Provisional Patent Application', 'No Patent'];
patent_status_options = ['Utility Filed', 'Utility Issued', 'Design Filed', 'Design Issued', 'Provisional Patent Application', 'No Patent'];
other_protection_options = ['None', 'Trademark', 'Copyright'];

  products = [];
  // isLoading = true;

  product = {};
  isEditing = false;

  Submitted = false;
  isSold = false;

addProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  email= new FormControl('', Validators.required);
  phone= new FormControl();
  product_invention_name= new FormControl();
  description = new FormControl('', Validators.required);
  selling_benefits_features = new FormControl();
  stage_of_company = new FormControl();
  attempts_to_build_business = new FormControl();
  circumstances_conceived_developed = new FormControl()
  difference_in_marketplace= new FormControl();
  similar_or_competing = new FormControl();
  currently_being_sold = new FormControl();
  being_sold_location = new FormControl();
  being_sold_price = new FormControl();
  units_sold_to_date = new FormControl();
  cost_to_manufacture = new FormControl();
  prototype_prod_piece_present = new FormControl();
  patent_status = new FormControl();
  other_protection = new FormControl();
  video_product_invention= new FormControl();
  photos_product_invention= new FormControl();
  sales_marketing_brochure= new FormControl();
  convicted_felony_misdemeanor_radio = new FormControl();
  convicted_felony_misdemeanor_description = new FormControl();

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder,
              private auth: Auth) { }

  ngOnInit() {

    this.addProductForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      phone: this.phone,
      product_invention_name: this.product_invention_name,
      description: this.description,
      selling_benefits_features: this.selling_benefits_features,
      attempts_to_build_business : this.attempts_to_build_business,
      circumstances_conceived_developed: this.circumstances_conceived_developed,
      stage_of_company: this.stage_of_company,
      difference_in_marketplace: this.difference_in_marketplace,
      similar_or_competing: this.similar_or_competing,
      currently_being_sold: this.currently_being_sold,
      being_sold_location: this.being_sold_location,
      being_sold_price: this.being_sold_price,
      units_sold_to_date: this.units_sold_to_date,
      cost_to_manufacture: this.cost_to_manufacture,
      prototype_prod_piece_present: this.prototype_prod_piece_present,
      patent_status: this.patent_status,
      other_protection: this.other_protection,
      video_product_invention: this.video_product_invention,
      photos_product_invention: this.photos_product_invention,
      sales_marketing_brochure: this.sales_marketing_brochure,
      convicted_felony_misdemeanor_radio: this.convicted_felony_misdemeanor_radio,
      convicted_felony_misdemeanor_description: this.convicted_felony_misdemeanor_description
    });
  }

  getProducts() {
    this.dataService.getProducts().subscribe(
      data => this.products = data,
      // () => this.isLoading = false
    );
  }

  getProduct(product) {
    this.dataService.getProduct(product).subscribe(
      data => this.product = data,
      // () => this.isLoading = false
    )
  }
  addProduct() {
    this.dataService.addProduct(this.addProductForm.value).subscribe(
      res => {
        const newProduct = res.json();
        this.products.push(newProduct);
        this.Submitted = true;
        this.toast.setMessage('Thank You For Your Submission.', 'success');
      },
      error => console.log(error)
    );
  }
  sold(value) {
    if (value === 'yes') {
      this.isSold = true;
  } else if ( value === 'no') {
    this.isSold = false;
  }
    
     console.log(value);
    console.log('hello')
  }
 
}
