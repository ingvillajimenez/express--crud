//definir funciones para http requests
const companies = require('../../../data')
const fs = require('fs');

const controllers = {
    index: (req, res) => {
        // res.send('GET /api/v1/companies')
        res.status(200).json({data: companies})
    },
    find: (req, res) => {
        const {id} = req.params
        const found = companies.data.filter(company => company.id == id)
        res.status(200).json({data: found})
    },
    create: (req, res) => {
        const {id} = req.body
        const isHere = companies.data.some(company => company.id == id)

        if(isHere) {
            res.json({message: 'Company already exists', data: req.body})
        }else {
            var addedCompanies = [...companies.data, req.body];
            var companiesToWrite = JSON.stringify({data: addedCompanies});

            fs.writeFile('./data.json', companiesToWrite, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            })
            res.status(201).json({data: addedCompanies});
        }
    },
    delete: (req, res) => {
        const {id} = req.params
        const isHere = companies.data.some(company => company.id == id)

        if(isHere) {
            var newCompanies = companies.data.filter(company => company.id != id);
            var companiesToWrite = JSON.stringify({data: newCompanies});

            fs.writeFile('./data.json', companiesToWrite, (err) => {
                if (err) throw err;
                console.log('The file has been saved!')
            })
            res.json({data: newCompanies});
        }else {
            res.status(204).json({message: 'Company not found'});
        }
    },
    update: (req, res) => {
        // console.log(req.body)
        // const identifier = req.params.id
        // const newCompanies = companies.data.filter(company => company.id != identifier)
        // let found = companies.data.filter(company => company.id == identifier)

        // found[0]['name'] = req.body.name
        // console.log(found)
        // let newObject = found[0]
        // newObject = Object.assign(newObject, req.body)
        // console.log(newObject)
        
        // const {id, name} = req.body
        // if(typeof id !== 'undefined') {
        //     found[0].name = name
        // }

        // if(typeof name !== 'undefined') {
        //     found[0].id = id
        // }

        // var newCompaniesUpdated = [...newCompanies, found[0]]
        // console.log(newCompaniesUpdated)
        // res.status(200).json({data: found})   
    }
}

//exportar
module.exports = controllers;