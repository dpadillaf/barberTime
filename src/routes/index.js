const express = require( 'express' );
const router = express.Router();

const Barberia = require( '../models/barberia' );
const Barbero = require( '../models/barbero' );
const Administrador = require( '../models/administrador' );
const Cita = require( '../models/cita' );

//Json todas las berberias
router.get( '/barberias', async ( req, res ) => {
    const barberias = await Barberia.find();
    console.log(barberias);
    res.json( barberias );
} );

//Json barberos de idBarberia
router.get( '/barberos/:idBarberia', async ( req, res ) => {
    const barberias = await Barberia.find( { _id: idBarberia } );
    console.log(barberias);
    res.json( barberias );
} );

//Json citas de la idBarberia
router.get( '/citas/:idBarberia', async ( req, res ) => {
    const citas = await Cita.find( { barberia: idBarberia } );
    res.json( citas );
} );

//Json citas de idBarbero
router.get( '/citas/:idBarbero', async ( req, res ) => {
    const citas = await Cita.find( { barbero: idBarbero } );
    res.json( citas );
} );

//agregar administrador
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

//agregar barberia
router.post( '/addbarberia', async ( req, res ) => {
    const barberia = new Barberia( req.body );
    await barberia.save( function( err ){ 
        if ( err ){
            res.send( err );
        }else{
            res.json( { 'msj': 'Barberia agregada con éxito!' } );
        }
     } );
    
} );

//agregar cita
router.post( '/addcita', async ( req, res ) => {
    const cita = new Cita( req.body );
    await cita.save( function( err ){ 
        if ( err ){
            res.send( err );
        }else{
            Cita.find( { nombreCliente: cita.nombreCliente }, ( err, cita ) => {
            res.json( cita );
            } );  
        }
     } );
    
} );

//logear sirve para admin y barbero, devuelve lo que corresponde
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

//agrega barbero
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

//borra cita con id
router.post( '/removebarbero', async ( req, res ) => {
    const { id } = req.params;
    await Barbero.remove( { _id: id }, ( err ) => {
        if ( err ){
            res.send( err );
        }else{
            res.json( { 'msj': 'Barbero borrado con éxito!!' }  );
        }
    } );
} );

//Json con la barberia de id
router.get( '/barberia/:id', async ( req, res ) => {
    const { id } = req.params;
    const barberia = await Barberia.findById( id );
    res.json( barberia );
} );

//atiende una cita con el id
router.post( '/atendercita', async ( req, res ) => {
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

//comprueba si resultado de consulta es vacío
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
  