
'use strict'

const Pelicula = require('./models/pelicula')



function getPelicula(req, res){


    Pelicula.findById(peliculaId, (err, pelicula) => {

        // captura de errores 
        if(err) return res.status(500).send({message: 'Error al realizar peticion'})
        if(!pelicula) return res.status(404).send({message: 'no existe la pelicula'})

        //impresión por pantalla y consola
        res.status(200).send({pelicula});
        console.log(pelicula);
      })


}

// Mostrar todos las peliculas
function getPeliculas(req, res){

    Pelicula.find({}, (err, pelicula) => {

        if(err) return res.status(500).send({message: 'Error al realizar peticion'})

        res.status(200).send({pelicula});
        console.log(pelicula);
      })

}

function updatePelicula(req, res){

    let peliculaId = req.params._id
    let update = req.body

    Pelicula.findByIdAndUpdate(peliculaId,update,{new:true},(err, peliculaUpdate) => {

     

        if(err) return res.status(500).send({message: `Error al borrar la pelicula ${err} `})
        res.status(200).send({message: 'La pélicula ha sido actualizada a: ' +peliculaUpdate + '!' })

      })


}

function deletePelicula(req, res){

    let peliculaId = req.params._id

    Pelicula.findById(peliculaId, (err, pelicula) => {

      // captura de errores 
      if(err) return res.status(500).send({message: `Error al borrar la pelicula ${err} `})
     

      //impresión por pantalla y consola
    
      pelicula.remove(err => {

        if(err) return res.status(500).send({message: `Error al borrar la pelicula ${err} `})
        res.status(200).send({message: 'La pélicula: '+pelicula + 'ha sido eliminada!' })

      })
    })
}

function postPelicula(req, res){

    console.log(req.body)

      let pelicula = new Pelicula()
      pelicula.titulo = req.body.titulo
      pelicula.age = req.body.age

      pelicula.save((err, nuevaPelicula, age) => {
      
      if (err) res.status(500).send({message: 'error al guardar la nueva pelicula'})
      res.status(200).send({message:'Se ha guardado la pelicula: ' +nuevaPelicula +', año de estreno: ' + age})

      })
}

exports = {

    getPelicula,
    getPeliculas,
    deletePelicula,
    updatePelicula,
    postPelicula
    
}