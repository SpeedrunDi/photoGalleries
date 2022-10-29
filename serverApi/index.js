require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const cors = require('cors');

const config = require('./config');
const users = require('./app/users');
const pictures = require('./app/pictures');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/pictures', pictures);

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });

  exitHook(() => {
    mongoose.disconnect();
    console.log('MongoDb disconnect');
  });
};

run().catch(e => console.error(e));