const express = require('express');
const port = 3333;

const app = express();

const routes = require('./routes');

const models = require('./app/models');

models.sequelize.sync()

app.use(routes);




app.listen(port);
console.log("Ouvindo porta " + port)