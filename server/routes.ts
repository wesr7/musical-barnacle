import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'express-jwt';
import * as aws from 'aws-sdk';
import { config } from 'dotenv';

import { myConfig } from '../client/app/auth.config'

import ProductsCtrl from './controllers/products';
import Product from './models/product.model';

export default function setRoutes(app) {
  config();
  const products = new ProductsCtrl();
  const S3_BUCKET = process.env.S3_BUCKET;
  console.log(S3_BUCKET);

  // APIs
  app.route('/api/products').get(products.getAll);
  app.route('/api/products/count').get(products.count);
  app.route('/api/product').post(products.insert);
  app.route('/api/product/:id').get(products.get);
  app.route('/api/product/:id').put(products.update);
  app.route('/api/product/:id').delete(products.delete);
  app.route('/api/sign-s3').get((req, res) => {
      const s3 = new aws.S3({endpoint: 's3-us-west-1.amazonaws.com'});
      s3.endpoint.hostname = 's3-us-west-1.amazonaws.com';
      s3.config.update({region: 'us-west-1'});
      const fileName = req.query['file-name'];
      const fileType = req.query['file-type'];
      const file = req.query['file'];
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        ACL: 'public-read',
        ContentType: fileType,
        Expires: 10000
              };

      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
          console.log(err);
          return res.end();
        }
        const returnData = {
          signedRequest: data,
          url: `https://${S3_BUCKET}.s3-us-west-1.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
      });
    });
}
