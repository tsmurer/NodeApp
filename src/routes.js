const Router = require('express');
const bodyParser = require('body-parser')

import UserController from './app/controllers/UserController';
import RepositoriesController from './app/controllers/RepositoriesController';
import FollowsController from './app/controllers/FollowsController';
import StarsController from './app/controllers/StarsController';

var jsonParser = bodyParser.json()
 

const routes = new Router();

// get 1
routes.get('/users/:username', UserController.get);
routes.get('/users/:username/repositories/:id', RepositoriesController.get);

// find all
routes.get('/users/', UserController.findAll);
routes.get('/users/:username/repositories/', RepositoriesController.findAll);
routes.get('/users/:username/follows/', FollowsController.findAll);
routes.get('/users/:username/repositories/:id/stars', StarsController.findAll);

// create
routes.post('/users/', jsonParser, UserController.post);
routes.post('/users/:username/repositories/', jsonParser, RepositoriesController.post);
routes.post('/users/:username/follows/', jsonParser, FollowsController.post);
routes.post('/users/:username/repositories/:id/stars', jsonParser, StarsController.post);

// update
routes.put('/users/:id', jsonParser, UserController.update);
routes.put('/users/:username/repositories/:id', jsonParser, RepositoriesController.update);

// delete
routes.delete('/users/:id', UserController.delete);
routes.delete('/users/:username/repositories/:id', RepositoriesController.delete);
routes.delete('/users/:username/follows/', jsonParser, FollowsController.unfollow);
routes.delete('/users/:username/repositories/:id/stars', jsonParser, StarsController.delete);



module.exports = routes;