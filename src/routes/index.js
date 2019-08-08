const express = require( 'express' );
const router = express.Router();

const Barberia = require( '../models/barberia' );
const Barbero = require( '../models/barbero' );
const Administrador = require( '../models/administrador' );
const Cita = require( '../models/cita' );

router.get( '/', async ( req, res ) => {
    const barberias = await Barberia.find();
    res.render( 'index', { barberias } );
} );

router.get( '/login', async ( req, res ) => {
    res.render( 'login' );
} );

router.get( '/register', async ( req, res ) => {
    res.render( 'register' );
} );

router.post( '/register', async ( req, res ) => {
    const administrador = new Administrador( req.body );
    await administrador.save();
    res.render( 'register', { msj: 'Usuario agregado con éxito!' } );
} );

router.post( '/login', async ( req, res ) => {
    const { email } = req.body;
    const { password } = req.body;
    await Administrador.find( { 'email': email, 'password': password }, ( err1, user1 ) => {
        if(!user1) { // Si el usuario no existe
            Barbero.find( { 'email': email, 'password': password }, ( err2, user2 ) => {
                if(!user2) {
                    res.render( 'login', { msj: 'Email o contraseña incorrect@' } );
                }
                const citas = Cita.find( { 'barbero': user2.id } );
                res.render('barbero', { 
                    user: user2,
                    citas: citas
                });
            } );
        }
        const barberia = Barberia.find( { 'admin': user1.admin } );
        const barberos = Barbero.find( { 'barberia': barberia.id } );
        res.render('admin', { 
            user: user1,
            barberia:  barberia,
            barberos: barberos
         });
    } );
    

} );

router.get( '/barberia/:id', async ( req, res ) => {
    const { id } = req.params;
    const barberia = await Barberia.findById( id );
    const barberos = await Barbero.find( { 'barberia': id } );
    const citas = await Cita.find( { 'barberia': id } );
    res.render( 'barberia', { 
        barberia: barberia,
        barberos: barberos,
        citas: citas
     } );
} );



module.exports = router;