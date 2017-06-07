import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

stage_company_options = ['Utility Filed', 'Utility Issued', 'Design Filed', 'Design Issued', 'Provisional Patent Application', 'No Patent'];
patent_status_options = [
  {value: 'Utility Filed', display: 'Utility Filed'}, {value: ' Utility Issued ', display: 'Utility Issued'}, {value: ' Design Filed', display: 'Design Filed'}, {value: ' Design Issued', display: 'Design Issued'}, {value: ' Provisional Patent Application', display: 'Provisional Patent Application'}, { value: ' No Patent', display: 'No Patent'}
  ];
other_protection_options = [{value: 'None', display: 'None'}, {value: 'Trademark', display: 'Trademark'}, {value: 'Copyright', display: 'Copyright'}];

  products = [];
  product = {};
  Submitted = false;
  isSold = false;
  changeLog;
  imagesArray = [];
  imagePicked = false;

  addProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  email= new FormControl('', Validators.required);
  phone= new FormControl('', Validators.required);
  product_invention_name= new FormControl('', Validators.required);
  description = new FormControl('', [Validators.required, Validators.maxLength(5000)]);
  selling_benefits_features = new FormControl('', Validators.required);
  stage_of_company = new FormControl('', Validators.required);
  attempts_to_build_business = new FormControl('', Validators.required);
  circumstances_conceived_developed = new FormControl('', Validators.required)
  difference_in_marketplace= new FormControl('', [Validators.required, Validators.maxLength(500)]);
  similar_or_competing = new FormControl('', Validators.required);
  currently_being_sold = new FormControl('', Validators.required);
  being_sold_location = new FormControl();
  being_sold_price = new FormControl();
  units_sold_to_date = new FormControl();
  cost_to_manufacture = new FormControl();
  prototype_prod_piece_present = new FormControl('', Validators.required);
  patent_status = new FormControl('', Validators.required);
  other_protection = new FormControl('', Validators.required);
  video_product_invention= new FormControl();
  photos_product_invention= new FormControl();
  sales_marketing_brochure= new FormControl();
  convicted_felony_misdemeanor_radio = new FormControl('', Validators.required);
  convicted_felony_misdemeanor_description = new FormControl();
  captcha = new FormControl('', Validators.required);

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
      photos_product_invention: [],
      sales_marketing_brochure: '',
      convicted_felony_misdemeanor_radio: this.convicted_felony_misdemeanor_radio,
      convicted_felony_misdemeanor_description: this.convicted_felony_misdemeanor_description,
      captcha: ''
    });
  }

  getProducts() {
    this.dataService.getProducts().subscribe(
      data => this.products = data
    );
  }

  getProduct(product) {
    this.dataService.getProduct(product).subscribe(
      data => this.product = data
    )
  }
  addProduct() {
    this.addProductForm.patchValue({photos_product_invention: this.imagesArray});
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

  inputChange(input) {
    const files = (<HTMLInputElement>document.getElementById(input)).files;
    const file = files[0]
    this.dataService.getSignedRequest(file)
    .then(response => {
      this.dataService.uploadFile(file, response.signedRequest, response.url)
      .then(url => {
        if (file.type.split('/')[0] == 'application'){
          this.addProductForm.patchValue({sales_marketing_brochure: url});
        } else if (file.type.split('/')[0] == 'image') {
          this.imagesArray.push(url)
          this.imagePicked = true;
        }
      });
    });
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
    checkEvent(event) {
      console.log(event);
    }
}
