// app.js
// Punto de entrada del backend INTEGRADO del proyecto Sura EPS.
// Une en un solo servidor Express los tres módulos trabajados:
//   - /api/auth        -> login, registro y cierre de sesión
//   - /api/citas        -> programación de citas médicas
//   - /api/resultados   -> resultados de laboratorio
// Todos los módulos comparten UNA sola base de datos en MongoDB Atlas.

const dns = require('dns'); dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const cors = require('cors');

const conectarDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const citasRoutes = require('./routes/citas.routes');
const resultadosRoutes = require('./routes/resultados.routes');

const app = express();
const PUERTO = 4000;

// Middlewares
app.use(cors());          // permite que el front-end React consuma esta API
app.use(express.json());  // permite recibir JSON en el body de las peticiones

// Conexión a la base de datos única (suraIntegradoDB)
conectarDB();

// Montaje de rutas por módulo
app.use('/api/auth', authRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/resultados', resultadosRoutes);

// Ruta raíz, solo para verificar que el servidor está activo
app.get('/', (req, res) => {
    res.send('API integrada Sura EPS (login + citas médicas + resultados de laboratorio). Servidor activo.');
});

app.listen(PUERTO, () => {
    console.log(`Servidor integrado escuchando en http://localhost:${PUERTO}`);
});
