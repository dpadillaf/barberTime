const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const AdministradorSchema = new Schema( {
    nombre: String,
    apellido: String,
    email: String,
    password: String
} );

module.exports = mongoose.model( 'administradores', AdministradorSchema );