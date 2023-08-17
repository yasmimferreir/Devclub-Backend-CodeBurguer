import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import configDatabase from '../config/database';
import Product from '../app/models/Product';
import Category from '../app/models/Category';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:VIU4DoG2acuKx9MjYwMq@containers-us-west-165.railway.app:6582/railway'
    );
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:Nq9VFuAkDs8A6FtTs4Kf@containers-us-west-106.railway.app:6417',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
