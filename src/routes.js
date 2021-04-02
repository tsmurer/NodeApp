const Router = require('express');
const bodyParser = require('body-parser')

import UserController from './app/controllers/UserController';

var jsonParser = bodyParser.json()
 

const routes = new Router();

// get 1
routes.get('/users/:username', UserController.get);

// find all
routes.get('/users/', UserController.findAll);

// create
routes.post('/users/', jsonParser, UserController.post);

// update
routes.put('/users/:id', jsonParser, UserController.update);

// delete
routes.delete('/users/:id', UserController.delete);



module.exports = routes;