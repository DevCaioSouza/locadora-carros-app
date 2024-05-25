const { where } = require('sequelize');
const Car = require('../models/Car');
const Timeline = require('../models/Timeline');

const availableArr = [];

module.exports = class CarController {

  static async showAllCars(req, res){

    const cars = await Car.findAll();

    const allCars = cars.map((result) => result.get());

    res.json(allCars);
  }

  static async availableCars(req, res){

    const rentedCars = await Timeline.findAll();
    const getRentedIds = rentedCars.map( result => result.carId );

    const cars = await Car.findAll();
    const carsIds = cars.map(result => result.id)

    const filteredResults = carsIds.filter(element => !getRentedIds.includes(element));

    res.json(filteredResults);
  }

  static async showCarById(req, res){
    const carId = req.params.id;

    const car = await Car.findOne({
      where: {
        id: carId
      }
    })

    if(!car){
      res.json('Car not found.');
    }

    res.json(car);
  }

  static async createCar (req, res){
    const car = {
      model: req.body.model,
      brand: req.body.brand,
      description: req.body.description,
      rentPrice: req.body.rentPrice,
      category: req.body.category
    }

    try{

      await Car.create(car);

      res.status(200).json('Carro adicionado')

    } catch (err) {
      console.log('Opa! Tivemos um erro.' + err);
    }
  }

  static async updateCar(req, res){

    const carId = req.params.id;

    await Car.update(req.body, {
      where: {
        id: carId
      }
    })
  
    res.json('Carro atualizado');
  }

  static async deleteCar(req, res){

    const carId = req.params.id;

    await Car.destroy({
      where: {
        id: carId
      }
    })

    res.json('Carro deletado');
  }
}