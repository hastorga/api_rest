
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var peliculaSchemaJSON = {
    titulo: String,
    age: Number
 
};

mongoose.model('pelicula', peliculaSchema)

// Creando Schema
var peliculaSchema = new Schema(peliculaSchemaJSON);

// Creando modelo
var Pelicula = mongoose.model("pelicula",peliculaSchema);