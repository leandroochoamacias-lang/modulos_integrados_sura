// seed/seedCitas.js
// Script de carga inicial: migra las citas de prueba que antes vivían en
// backend/data.json (proyecto original de Citas Médicas) hacia la colección
// "citas" de MongoDB, para no perder los datos de prueba al integrar.
//
// Ejecutar una sola vez con:   node seed/seedCitas.js

const conectarDB = require('../config/db');
const Cita = require('../models/Cita');
const mongoose = require('mongoose');

const citasDePrueba = [
    { documento: '1035678912', paciente: 'Laura Gómez Restrepo', especialidad: 'Medicina General', medico: 'Dr. Andrés Peña', fecha: '2026-09-18', hora: '08:30', estado: 'Confirmada' },
    { documento: '1035678912', paciente: 'Laura Gómez Restrepo', especialidad: 'Odontología', medico: 'Dra. Camila Ríos', fecha: '2026-09-25', hora: '10:00', estado: 'Pendiente' },
    { documento: '43987654', paciente: 'Jorge Iván Suárez', especialidad: 'Cardiología', medico: 'Dr. Mauricio Lopera', fecha: '2026-09-20', hora: '14:15', estado: 'Confirmada' },
    { documento: '43987654', paciente: 'Jorge Iván Suárez', especialidad: 'Medicina General', medico: 'Dr. Andrés Peña', fecha: '2026-08-30', hora: '09:00', estado: 'Cancelada' },
    { documento: '1128459632', paciente: 'Mariana Zapata Uribe', especialidad: 'Pediatría', medico: 'Dra. Sandra Montoya', fecha: '2026-09-22', hora: '11:45', estado: 'Confirmada' }
];

async function ejecutarSeed() {
    await conectarDB();

    const existentes = await Cita.countDocuments();
    if (existentes > 0) {
        console.log(`Ya existen ${existentes} citas en la base de datos. No se insertaron duplicados.`);
    } else {
        await Cita.insertMany(citasDePrueba);
        console.log('Citas de prueba insertadas correctamente.');
    }

    await mongoose.disconnect();
}

ejecutarSeed();
