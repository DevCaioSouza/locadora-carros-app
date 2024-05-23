const Car = require('../models/Car');

module.exports = class CarController {
  static async showAllCars(req, res){
    // res.send('Resposta do server!!');

    const cars = await Car.findAll();

    const allCars = cars.map((result) => result.get());

    res.json(allCars);
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
}