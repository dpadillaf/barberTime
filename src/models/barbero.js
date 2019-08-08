const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const BarberoSchema = new Schema( {
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    barberia: String
} );

module.exports = mongoose.model( 'barberos', BarberoSchema );