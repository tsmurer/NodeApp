const Router = require('express');
const bodyParser = require('body-parser')

import UserController from './app/controllers/UserController';
import RepositoriesController from './app/controllers/RepositoriesController';

var jsonParser = bodyParser.json()
 

const routes = new Router();

// get 1
routes.get('/users/:username', UserController.get);
routes.get('/users/:username/repositories/:id', RepositoriesController.get);

// find all
routes.get('/users/', UserController.findAll);
routes.get('/users/:username/repositories/', RepositoriesController.findAll);

// create
routes.post('/users/', jsonParser, UserController.post);
routes.post('/users/:username/repositories/', jsonParser, RepositoriesController.post);

// update
routes.put('/users/:id', jsonParser, UserController.update);
routes.put('/users/:username/repositories/:id', jsonParser, RepositoriesController.update);

// delete
routes.delete('/users/:id', UserController.delete);
routes.delete('/users/:username/repositories/:id', RepositoriesController.delete);



module.exports = routes;