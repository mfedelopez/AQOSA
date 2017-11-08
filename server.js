var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var fs = require('fs');
// var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(express.static('../public'));
app.use(cookieParser())

// var uri = "mongodb://kay:UFEISHW8REZT4WTC@Desarrollo-shard-00-00-wpeiv.mongodb.net:27017,Desarrollo-shard-00-01-wpeiv.mongodb.net:27017,Desarrollo-shard-00-02-wpeiv.mongodb.net:27017/admin?ssl=true&replicaSet=Desarrollo-shard-0&authSource=admin";
 //var uri = "mongodb://admin:UfEisHW8rEzt4WTc@desarrollo-shard-00-00-2pshm.mongodb.net:27017,desarrollo-shard-00-01-2pshm.mongodb.net:27017,desarrollo-shard-00-02-2pshm.mongodb.net:27017/test?ssl=true&replicaSet=Desarrollo-shard-0&authSource=admin";
 var uri = "mongodb://CON089/desarrollo-shard-00-00-2";
 MongoClient.connect(uri, function(err, db) {
  if(err){
    throw err;
  }
  else {
    console.log("conectado OK a la base de datos");
    db.close();
  }
});

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var objetos;
app.get('/listUsers', function (req, res) {
  MongoClient.connect(uri, function(err, db) {
    if(err){
      throw err;
    }
    else {
      console.log("obteniendo registros");
      db.collection('usuarios').find({}).toArray(function(err, resultado){
        if (err) throw err;
        console.log(resultado);
        objetos = resultado;
      })
      db.close();
    }
  });
  res.send(objetos);
  //  fs.readFile( __dirname + "/" +objetos, 'utf8', function (err, data) {
  //      console.log( data );
  //      res.end( data );
  //  });
})

// // This responds with "Hello World" on the homepage
// app.get('/', function (req, res) {
//    console.log("Got a GET request for the homepage");
//   //  console.log("Cookies: " + req.cookies);
//    res.send('Hello GET');
// })
//
// This responds with "Hello World" on the homepage
app.get('/index.htm', function (req, res) {
   console.log("Got a GET request for the index");
  //  res.send('Hello GET');
  res.sendFile( __dirname + "/index.htm");
})
//
// app.get('/process_get', function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.query.first_name,
//       last_name:req.query.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })
//
app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
     usuario: req.body.usuario,
     password: req.body.password
   }
   console.log(response);
   MongoClient.connect(uri, function(err, db) {
     if(err){
       throw err;
     }
     else {
       console.log("insertando registros");
       db.collection('usuarios').insertOne(response, function(err, resultado){
         if (err) throw err;
         console.log(resultado);
        });
      }
       db.close();
     })
        //  res.end(JSON.stringify(response));
         res.end('Holis');
   });

//
// // This responds a DELETE request for the /del_user page.
// app.delete('/del_user', function (req, res) {
//    console.log("Got a DELETE request for /del_user");
//    res.send('Hello DELETE');
// })
//
// // This responds a GET request for the /list_user page.
// app.get('/list_user', function (req, res) {
//    console.log("Got a GET request for /list_user");
//    res.send('Page Listing');
// })
//
// // This responds a GET request for abcd, abxcd, ab123cd, and so on
// app.get('/ab*cd', function(req, res) {
//    console.log("Got a GET request for /ab*cd");
//    res.send('Page Pattern Match');
// })

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
