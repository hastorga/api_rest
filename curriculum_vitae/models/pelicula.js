
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var peliculaSchema = {
    titulo: String,
    age: Number
 
};

module.exports = mongoose.model('Pelicula', peliculaSchema)
 