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

//Json busqueda de berberias
router.post( '/busqueda', async ( req, res ) => {
    const { buscar } = req.body;
    const barberias = await Barberia.find( { nombre: { $regex: buscar } } );
    console.log(barberias);
    res.json( barberias );
} );

//Json barberos de idBarberia
router.get( '/barberos/:idBarberia', async ( req, res ) => {
    const { idBarberia } = req.params;
    console.log( req.param )
    const barberos = await Barbero.find( { barberia: idBarberia } );
    console.log(barberos);
    res.json( barberos );
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

//agregar servicio a barberia
router.post( '/addserviciobarberia', async ( req, res ) => {
    const { servicio } = req.body;
    const { id } = req.body;
    await Barberia.update(  { _id: id }, { $push: { servicios: servicio } } );
    res.json( { 'msj': 'Servicio agregado con éxito!' } );
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
                    res.json( false );
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
            res.json( { 'msj': 'Barbero agregado con éxito!' }  );
        }
    } );
} );

//borra barbero
router.delete( '/removebarbero/:id', async ( req, res ) => {
    const { id } = req.params;
    await Barbero.findByIdAndDelete( id );
    
} );

//Json con la barberia de id
router.get( '/barberia/:id', async ( req, res ) => {
    const { id } = req.params;
    const barberia = await Barberia.find( { admin: id } );
    res.json( barberia );
} );

//Json con la barberia de id de barberia
router.get( '/barberiaid/:id', async ( req, res ) => {
    const { id } = req.params;
    const barberia = await Barberia.find( { _id: id } );
    res.json( barberia );
} );

//atiende una cita con el id
router.post( '/atendercita', async ( req, res ) => {
    const { id } = req.param;
    Cita.update( { '_id': id }, { 'estado': true }, function( err ){ 
        if ( err ){
            res.send( err );
        }else{
            res.json( { 'msj': 'Cita atendida!' } );
        }
     } );
} );

router.get( '/estadisticas/:idBarberia', async ( req, res ) => {
    const data = [];
    let cont = 0;
    const { idBarberia } = req.params;
    const barberos = await Barbero.find( { barberia: idBarberia } );
    await barberos.map( ( barbero ) => {
        Cita.find( { barbero: barbero._id, estado: true } ).countDocuments( ( e, num ) => {
            data.push( {
                'nombre': barbero.nombre,
                'id': barbero._id,
                'citasAtendidas': num
            } );
            //console.log( data );
            //data.push( barb );
            cont++;
            if ( cont == barberos.length ) res.json( data );
        } );
    } );
    //console.log( prueba );
} );

module.exports = router;

//comprueba si resultado de consulta es vacío
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
  