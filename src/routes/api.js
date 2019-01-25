//definir rutas

//configurar rutas

const {Router} = require('express')

const app = Router()

const Companies = require('../controllers/companies/companies')

app.get('/companies', Companies.index)
//Dos puntos indica que id es una variable como una clave del objeto req.params
app.get('/companies/:id', Companies.find)

app.post('/companies', Companies.create)

app.delete('/companies/:id', Companies.delete)

app.put('/companies/:id', Companies.update)


//post
// si existe no hace nada --> res --> company
// si no existe que lo grabe en archivo

//put
// si existe lo puedes modificar
// puedes modificar el id y el nombre
// res --> objeto modificado

//delete
// si lo encuentra lo elimina
// res --> mostrar las companias sin el elemento

// --postman
// si borran hay que hacer un Get para testear
// si actualizan hay que hacer un Get para testear
// si post hay que hacer un Get para testear

module.exports = app;