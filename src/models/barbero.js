const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const BarberoSchema = new Schema( {
    nombre: String,
    email: String,
    password: String,
    admin: String
} );

module.exports = mongoose.model( 'barberos', BarberoSchema );