import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cors from 'cors';
import * as aws from 'aws-sdk';

import config from './config/db';
import Product from './models/product.model';
import setRoutes from './routes';

const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(cors());
app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

mongoose.connect(config.url);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('Inventors Showcase listening on port ' + app.get('port'));
  });

});

export { app };
