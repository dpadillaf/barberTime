const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const CitaSchema = new Schema( {
    nombreCliente: String,
    telefonoCliente: Number,
    barberia: String,
    barbero: String,
    estado: Boolean,
    fecha: Date,
    hora: String,
    turno: Number
} );

module.exports = mongoose.model( 'citas', CitaSchema );