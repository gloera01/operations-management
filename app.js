import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import routes from './src/routes';
import configureAuth from './src/commons/configureJwtAuth';

// setup configuration
const app = express();

// temporal until upgrade to V7
mongoose.set('strictQuery', true);
mongoose.connect(config.dbConnectionString);
configureAuth();

// setup middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(config.port, () => {
  if (config.env === 'dev') {
    console.log(`Running app: env -> ${config.env} port -> ${config.port}`);
  }
});
