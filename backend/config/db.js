// config/db.js
// Módulo encargado de conectar la aplicación a la base de datos MongoDB Atlas.
// Esta es la ÚNICA base de datos del sistema integrado: aquí conviven las
// colecciones de los tres módulos (usuarios, citas y resultados de laboratorio).
const mongoose = require('mongoose');

// Se reutiliza el clúster que ya tenías en loginprincipal, cambiando el nombre
// de la base de datos a "suraIntegradoDB" para reflejar que ahora es compartida
// por los tres módulos.
const MONGO_URI = 'mongodb://leandroochoamacias_db_user:Leandro2026@ac-ckz1pnv-shard-00-00.pwk2fgn.mongodb.net:27017,ac-ckz1pnv-shard-00-01.pwk2fgn.mongodb.net:27017,ac-ckz1pnv-shard-00-02.pwk2fgn.mongodb.net:27017/suraIntegradoDB?ssl=true&replicaSet=atlas-8zbf9t-shard-0&authSource=admin&appName=Cluster0';

const conectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conexión exitosa a MongoDB Atlas (base de datos: suraIntegradoDB)');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); // detiene la app si no logra conectar
    }
};

module.exports = conectarDB;
