const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');

router.get('/carros', CarController.showAllCars);
router.post('/carros', CarController.createCar);