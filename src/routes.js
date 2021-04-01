const Router = require('express');
const bodyParser = require('body-parser')

import UserController from './app/controllers/UserController';

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser

const routes = new Router();


routes.get('/users/:username', UserController.get);
routes.get('/users/', UserController.findAll);
routes.post('/users/', jsonParser, UserController.post);

module.exports = routes;