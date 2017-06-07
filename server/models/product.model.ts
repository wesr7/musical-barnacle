import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  product_invention_name: {type: String, required: true},
  description: String,
  selling_benefits_features: String,
  stage_of_company: String,
  attempts_to_build_business: String,
  circumstances_conceived_developed: String,
  difference_in_marketplace: String,
  similar_or_competing: String,
  currently_being_sold: String,
  being_sold_location: String,
  being_sold_price: String,
  units_sold_to_date: String,
  cost_to_manufacture: String,
  prototype_prod_piece_present: String,
  patent_status: [{type: String}],
  other_protection: [String],
  video_product_invention: String,
  photos_product_invention:  [String],
  sales_marketing_brochure: String,
  convicted_felony_misdemeanor_radio: String,
  convicted_felony_misdemeanor_description: String
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;
