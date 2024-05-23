const express = require('express');

const app = express();

const conn = require('./db/conn');

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));