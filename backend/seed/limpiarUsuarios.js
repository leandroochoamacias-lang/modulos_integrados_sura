// seed/limpiarUsuarios.js
// Elimina la colección "usuarios" (y sus índices antiguos) para poder
// registrar usuarios de nuevo con el esquema actualizado (login por documento).
// Ejecutar con: node seed/limpiarUsuarios.js

const conectarDB = require('../config/db');
const mongoose = require('mongoose');

async function limpiar() {
    await conectarDB();

    try {
        await mongoose.connection.collection('usuarios').drop();
        console.log('Colección "usuarios" eliminada (junto con sus índices antiguos).');
        console.log('Ahora puedes registrar usuarios de nuevo desde el formulario.');
    } catch (error) {
        if (error.codeName === 'NamespaceNotFound') {
            console.log('La colección "usuarios" no existía. No hay nada que limpiar.');
        } else {
            console.error('Error al limpiar:', error.message);
        }
    }

    await mongoose.disconnect();
}

limpiar();