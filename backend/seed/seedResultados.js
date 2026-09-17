// seed/seedResultados.js
// Script de carga inicial: inserta resultados de laboratorio de prueba para
// los mismos documentos que ya tienen citas médicas de prueba, así puedes
// probar el módulo de Resultados de laboratorio de una vez.
//
// Ejecutar una sola vez con:   node seed/seedResultados.js

const conectarDB = require('../config/db');
const Resultado = require('../models/Resultado');
const mongoose = require('mongoose');

const resultadosDePrueba = [
    { documentoPaciente: '1035678912', tipoExamen: 'Hemograma completo', fechaExamen: '2026-09-10', resultado: 'Valores dentro de rango normal', estado: 'entregado', observaciones: 'Sin hallazgos relevantes' },
    { documentoPaciente: '1035678912', tipoExamen: 'Glicemia en ayunas', fechaExamen: '2026-09-18', resultado: '', estado: 'pendiente', observaciones: '' },
    { documentoPaciente: '43987654', tipoExamen: 'Perfil lipídico', fechaExamen: '2026-09-12', resultado: 'Colesterol total: 195 mg/dL', estado: 'listo', observaciones: 'Pendiente por retirar en laboratorio' },
    { documentoPaciente: '1128459632', tipoExamen: 'Uroanálisis', fechaExamen: '2026-09-14', resultado: 'Sin alteraciones', estado: 'entregado', observaciones: '' }
];

async function ejecutarSeed() {
    await conectarDB();

    const existentes = await Resultado.countDocuments();
    if (existentes > 0) {
        console.log(`Ya existen ${existentes} resultados en la base de datos. No se insertaron duplicados.`);
    } else {
        await Resultado.insertMany(resultadosDePrueba);
        console.log('Resultados de laboratorio de prueba insertados correctamente.');
    }

    await mongoose.disconnect();
}

ejecutarSeed();
