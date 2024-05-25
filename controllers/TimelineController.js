const { where } = require('sequelize');
const Car = require('../models/Car');
const Timeline = require('../models/Timeline');

module.exports = class TimelineController {
  
  static async rentCar(req, res){
    const timelineEvent = {
      carId: req.body.carId,
      initialDate: req.body.initialDate,
      finalDate: req.body.finalDate
    }

    const ownedCar = await Car.findOne({
      where: {
        id: timelineEvent.carId
      },
      raw: true
    })

    const ownedCarObj = JSON.parse(JSON.stringify(ownedCar));

    if(ownedCarObj == null){
      res.status(404).json('Carro não encontrado na tabela de Carros disponíveis');
      return
    }

    if(ownedCarObj.id == timelineEvent.carId){
      try{

        if(timelineEvent){
          res.json('Esse carro já está alugado');
          return
        }

        await Timeline.create(timelineEvent);
  
        res.status(200).json(ownedCar);
  
      } catch (err) {
        console.log('Opa! Tivemos um erro.' + err);
      }
    } 
  }
}