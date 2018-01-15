
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema



const peliculaSchema = Schema({
    titulo: String,
    age: Number
 
})


module.exports = mongoose.model('pelicula', peliculaSchema)
