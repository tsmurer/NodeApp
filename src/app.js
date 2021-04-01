const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const routes = require('./routes');

const models = require('./app/models');

models.sequelize.sync()

app.use(routes);




app.listen(3333);
console.log("Ouvindo porta 3333")