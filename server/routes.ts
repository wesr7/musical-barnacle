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
      const s3 = new aws.S3({endpoint: 's3-us-west-1.amazonaws.com/', signatureVersion: 'v4'});
      s3.endpoint.hostname = 's3-us-west-1.amazonaws.com/';
      s3.config.update({region: 'us-west-1'});
      console.log(s3);
      console.log(req);
      const fileName = req.query['file-name'];
      const fileType = req.query['file-type'];
      const file = req.query['file'];
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 10000,
        ContentType: fileType,
        ACL: 'public-read'
      };

      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
          console.log(err);
          return res.end();
        }
        console.log(data);
        const returnData = {
          signedRequest: data,
          url: `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
      });

      s3.upload({
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: file,
        ContentType: fileType,
        ACL: 'public-read'
      }, function(err, data) {
        console.log(file);
        console.log(err, data);
      });
    });
}
