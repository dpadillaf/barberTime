const path = require( 'path' );
const morgan = require( 'morgan' );
const express = require( 'express' );
const mongoose = require( 'mongoose' );

const app = express();

//conexión a bd
mongoose.connect( 'mongodb://localhost/db_barberTime', {useNewUrlParser: true} )
    .then( db => console.log( 'db conectada' ) )
    .catch( err => console.log( err ) );

//importando rutas
const indexRoutes = require( './routes/index' );

//configuraciones
//define puerto predefindo por el SO o 3000
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set( 'view engine', 'html' );

//middlewares
app.use( morgan( 'dev' ) );
//para recibir formularios y que no sean muy grandes, solo texto.
app.use( express.urlencoded( { extended: false } ) );

//rutas
app.use( '/', indexRoutes );

//iniciando server
app.listen( app.get( 'port' ), () => {
    console.log( "server on port ", app.get( 'port' ) );
} );