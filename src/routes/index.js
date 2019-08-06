const express = require( 'express' );
const router = express.Router();

const Barberia = require( '../models/barberia' );

router.get( '/', async ( req, res ) => {
    const barberias = await Barberia.find();
    res.render( 'index', { barberias } );
} );

router.get( '/login', async ( req, res ) => {
    res.render( 'login' );
} );

router.get( '/barberia/:id', async ( req, res ) => {
    const { id } = req.params;
    const barberia = await Barberia.findById( id );
    res.render( 'barberia', { barberia } );
} );

module.exports = router;