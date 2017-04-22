import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'express-jwt';

import { myConfig } from '../client/app/auth.config'

import ProductsCtrl from './controllers/products';
import Product from './models/product.model';

export default function setRoutes(app) {

  const products = new ProductsCtrl();

  // APIs
  app.route('/api/products').get(products.getAll);
  app.route('/api/products/count').get(products.count);
  app.route('/api/product').post(products.insert);
  app.route('/api/product/:id').get(products.get);
  app.route('/api/product/:id').put(products.update);
  app.route('/api/product/:id').delete(products.delete);
}
