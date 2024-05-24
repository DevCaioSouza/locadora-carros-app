const express = require('express');

const app = express();

const conn = require('./db/conn');

// Models

const Car = require('./models/Car');
const CarController = require('./controllers/CarController');

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));

  app.use(
    express.urlencoded({
      extended: true
    })
  );

  app.use(express.json());

  //routes

  app.get('/carros', CarController.showAllCars);

  app.get('/carros/:id', CarController.showCarById);

  app.post('/carros', CarController.createCar);

  app.put('/carros/:id', CarController.updateCar);
