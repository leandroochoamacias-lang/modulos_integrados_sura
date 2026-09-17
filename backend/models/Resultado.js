// models/Resultado.js
// Define la estructura del documento "Resultado" (de laboratorio) en MongoDB.
// Campos acordados con el aprendiz: documento del paciente, tipo de examen,
// fecha del examen, resultado, estado y observaciones.
const mongoose = require('mongoose');

const resultadoSchema = new mongoose.Schema({
    documentoPaciente: {
        type: String,
        required: true
    },
    tipoExamen: {
        type: String,
        required: true
    },
    fechaExamen: {
        type: String, // formato AAAA-MM-DD
        required: true
    },
    resultado: {
        type: String,
        default: '' // puede quedar vacío mientras el examen está "pendiente"
    },
    estado: {
        type: String,
        enum: ['pendiente', 'listo', 'entregado'],
        default: 'pendiente'
    },
    observaciones: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Resultado', resultadoSchema);
