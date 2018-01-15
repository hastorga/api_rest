'use srict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
// Llamada al schema de las películas: 
const pelicula = require('./models/pelicula')
const PeliculaController = require('./controllers/pelicula')


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// realizando conexion con la bd
mongoose.connect('mongodb://localhost/peliculas', { useMongoClient: true });




app.get("/list",(req,res) => {

    Pelicula.find((err,result) => {

        console.log(result);
        res.send(result);

      });
    });

  // API REST 

    app.get('/peliculas', PeliculaController.getPeliculas)

    app.get('/peliculas/:_id', PeliculaController.getPelicula)

    app.delete('/peliculas/:_id', PeliculaController.deletePelicula)

    // UPDATE
    app.put('/peliculas/:_id', PeliculaController.updatePelicula)

      // POST
    app.post('/peliculas', PeliculaController.postPelicula)
      

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

// MYSQL

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
