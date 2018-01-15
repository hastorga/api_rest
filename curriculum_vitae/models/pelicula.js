
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var peliculaSchema = {
    titulo: String,
    age: Number
 
};

mongoose.model('Pelicula', peliculaSchema)
 