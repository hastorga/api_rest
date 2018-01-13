'use srict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// realizando conexion con la bd
mongoose.connect('mongodb://localhost/peliculas', { useMongoClient: true });

var peliculaSchemaJSON = {
    titulo: String,
    age: Number
 
};

// Creando Schema
var peliculaSchema = new Schema(peliculaSchemaJSON);

// Creando modelo
var Pelicula = mongoose.model("peliculas",peliculaSchema);


app.get("/list",(req,res) => {

    Pelicula.find((err,result) => {

        console.log(result);
        res.send(result);

      });
    });

  // API REST 

    app.get('/peliculas', (req, res) => {

      Pelicula.find({}, (err, pelicula) => {

        if(err) return res.status(500).send({message: 'Error al realizar peticion'})

        res.status(200).send({pelicula});
        console.log(pelicula);
      })
      

    })
    app.get('/peliculas/:_id', (req, res) => {

      let peliculaId = req.params._id

      Pelicula.findById(peliculaId, (err, pelicula) => {

        // captura de errores 
        if(err) return res.status(500).send({message: 'Error al realizar peticion'})
        if(!pelicula) return res.status(404).send({message: 'no existe la pelicula'})

        //impresión por pantalla y consola
        res.status(200).send({pelicula});
        console.log(pelicula);
      })

    } )

    app.delete('/peliculas/:_id', (req, res) => {

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

    })

    // UPDATE
    app.put('/peliculas/:_id', (req, res) => {

      let peliculaId = req.params._id
      let update = req.body

      Pelicula.findByIdAndUpdate(peliculaId,update,{new:true},(err, peliculaUpdate) => {

       

          if(err) return res.status(500).send({message: `Error al borrar la pelicula ${err} `})
          res.status(200).send({message: 'La pélicula ha sido actualizada a: ' +peliculaUpdate + '!' })

        })
      })

      // POST
      app.post('/peliculas', (req,res) =>{

        console.log(req.body)

        let pelicula = new Pelicula()
        pelicula.titulo = req.body.titulo
        pelicula.age = req.body.age

        pelicula.save((err, nuevaPelicula) => {
        
        if (err) res.status(500).send({message: 'error al guardar la nueva pelicula'})
        res.status(200).send({message:'Se ha guardado la pelicula: ' +nuevaPelicula +', año de estreno: ' + age})

        })
      })
      




  // FINISH API REST 


//app.get('/', (req, res) => res.send('Hello World!'));
app.get('/hola', (req, res) => res.send('Hola! Bienvenido'));

app.get('/contacto', (req, res) => res.send('Contactame a hm.astorga@gmail.com'));

app.listen(80, () => console.log('Example app listening on port 80!'));


// conexion 

var mysql = require('mysql');

var con = mysql.createConnection({
  database: "workers",
  host: "localhost",
  user: "root",
  password: "barracuda132"
});

app.get("/bd",function(req,res){
    con.query('SELECT * from worker', function(err, rows, fields) {
    con.end();
      if (!err){
        console.log('The solution is: ', rows),
        res.send(rows);
      }else
        console.log('Error while performing Query.');
      });
    });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('assets'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
