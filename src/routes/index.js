const express = require( 'express' );
const router = express.Router();

const Barberia = require( '../models/barberia' );
const Barbero = require( '../models/barbero' );
const Administrador = require( '../models/administrador' );
const Cita = require( '../models/cita' );

router.get( '/barberias', async ( req, res ) => {
    const barberias = await Barberia.find();
    console.log(barberias);
    res.json( barberias );
} );

router.post( '/addadmin', async ( req, res ) => {
    const administrador = new Administrador( req.body );
    await administrador.save( function( err ){ 
        if ( err ){
            res.send( err );
        }else{
            res.json( { 'msj': 'Usuario agregado con éxito!' } );
        }
     } );
    
} );

router.post( '/login', async ( req, res ) => {
    const { email } = req.body;
    const { password } = req.body;
    await Administrador.find( { 'email': email, 'password': password }, ( err, user ) => {
        if ( isEmptyObject( user ) ){
            Barbero.find( { 'email': email, 'password': password }, ( err2, user2 ) => {
                if ( isEmptyObject( user2 ) ){
                    res.json( { 'msj': 'Email o contraseña incorrectas' } );
                }else{
                    res.json( user2 );
                }
            } );
        }else{
            res.json( user );
        }
    } );
} );

router.post( '/addbarbero', async ( req, res ) => {
    const barbero = new Barbero( req.body );
    await barbero.save( function( err ){ 
        if ( err ){
            res.send( err );
        }else{
            res.json( { 'msj': 'Usuario agregado con éxito!' }  );
        }
    } );
} );

router.get( '/barberia/:id', async ( req, res ) => {
    const { id } = req.params;
    const barberia = await Barberia.findById( id );
    res.json( barberia );
} );

router.put( '/atendercita', async ( req, res ) => {
    const { id } = req.params;
    Cita.update( { '_id': id }, { 'estado': true }, function( err ){ 
        if ( err ){
            res.send( err );
        }else{
            res.json( { 'msj': 'Cita atendida!' } );
        }
     } );
} );

module.exports = router;

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
  