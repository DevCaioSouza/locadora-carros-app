const express = require('express');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const conn = require('./db/conn');

// Models

const Car = require('./models/Car');
const CarController = require('./controllers/CarController');

const Timeline = require('./models/Timeline');
const TimelineController = require('./controllers/TimelineController');

const options = {
  definition: {
    openapi : '3.0.0',
    info : {
      title: 'API Restful para administrar aluguel de carros',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./index.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

  /**
   * @swagger
   * /carros:
   *  get:
   *    summary: Esse endpoint dá acesso a lista completa de carros que a empresa possui
   *    description: Esse endpoint dá acesso a lista completa de carros que a empresa possui
   *    responses: 
   *      200:
   *        description: Testar o método get - listar carros
  */
  app.get('/carros', CarController.showAllCars);

  /**
   * @swagger
   * /carros/alugados:
   *  put:
   *    summary: Esse endpoint serve para mostrar carros que já foram alugados
   *    description: Esse endpoint serve para mostrar carros que já foram alugados
   *    responses: 
   *      200:
   *        description: Testar o método put - Alterar dados de um carro específico
  */
  app.get('/carros/alugados', TimelineController.showRentedCars);

  /**
   * @swagger
   * /carros/disponiveis:
   *  get:
   *    summary: Esse endpoint dá acesso a lista de carros disponíveis para aluguel
   *    description: Esse endpoint dá acesso a lista carros disponíveis para aluguel
   *    responses: 
   *      200:
   *        description: Testar o método get - pegar carros disponíveis p/ aluguel
  */
  app.get('/carros/disponiveis', CarController.availableCars);

  /**
   * @swagger
   * /carros/alugar:
   *  post:
   *    summary: Esse endpoint serve para adicionar um carro a lista de alugados
   *    description: Esse endpoint serve para adicionar um carro a lista de alugados
   *    responses: 
   *      200:
   *        description: Testar o método post - alugar carro
  */
  app.post('/carros/alugar', TimelineController.rentCar);

  /**
   * @swagger
   * /carros/:id:
   *  get:
   *    summary: Esse endpoint serve para mostrar dados de um carro selecionado
   *    description: Esse endpoint serve para mostrar dados de um carro selecionado
   *    responses: 
   *      200:
   *        description: Testar o método get - exibir um carro selecionado
  */
  app.get('/carros/:id', CarController.showCarById);
  
  /**
   * @swagger
   * /carros:
   *  post:
   *    summary: Esse endpoint serve para adicionar um novo objeto à lista de carros da empresa
   *    description: Esse endpoint serve para adicionar um novo objeto à lista de carros da empresa
   *    responses: 
   *      200:
   *        description: Testar o método post - Adicionar novo carro
  */
  app.post('/carros', CarController.createCar);

  /**
   * @swagger
   * /carros/:id:
   *  put:
   *    summary: Esse endpoint serve para alterar dados de um carro específico
   *    description: Esse endpoint serve para alterar dados de um carro específico
   *    responses: 
   *      200:
   *        description: Testar o método put - Alterar dados de um carro específico
  */
  app.put('/carros/:id', CarController.updateCar);

  /**
   * @swagger
   * /carros/:id:
   *  delete:
   *    summary: Esse endpoint serve para deletar um carro específico
   *    description: Esse endpoint serve para deletar um carro específico
   *    responses: 
   *      200:
   *        description: Testar o método delete - Deletar um carro específico
  */
  app.delete('/carros/:id', CarController.deleteCar);



