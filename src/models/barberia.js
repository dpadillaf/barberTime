const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const BarberiaSchema = new Schema( {
    nombre: String,
    direccion: String,
    telefono: Number,
    servicios: [],
    admin: String
} );

module.exports = mongoose.model( 'barberias', BarberiaSchema );