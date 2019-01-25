require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

// configurar app para usar bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

const api = require('./src/routes/api')

console.log("**Express Version: ", require('express/package').version);


//middleware
app.use(morgan('combined'));

//el bueno para probar la ruta de nuestra API (endpoint)
// app.use('/api/v1', (req, res) => {
//   res.send('Hello /api/v1')
// })

app.use('/api/v1', api)

//testeando una ruta (sola una ruta de prueba)
app.get('/', (req, res) => {
  res.send('Hello Team')
})

//error 404
app.use((request, response) => {
  const ERROR = {
    message: '404. Not Found'
  }
  response
    .status(404)
    .json(ERROR);
});

//error 500
app.use((err, request, response, next) => {
  const ERROR = {
    message: '500. Server Error'
  }
  response
    .status(500)
    .json(ERROR);
});


app.listen(PORT, () => {
  const msg = chalk.blue(`Node Server is running on PORT: ${PORT}`);

  console.log(msg);
});

