// models/Cita.js
// Define la estructura del documento "Cita" en MongoDB.
// Los campos replican los que ya usaba el proyecto original de Citas Médicas
// (antes simulados en backend/data.json), para no perder compatibilidad con
// el front-end React ya existente.
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    documento: {
        type: String,
        required: true
    },
    paciente: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    medico: {
        type: String,
        required: true
    },
    fecha: {
        type: String, // formato AAAA-MM-DD, igual que en el proyecto original
        required: true
    },
    hora: {
        type: String, // formato HH:mm
        required: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Confirmada', 'Cancelada'],
        default: 'Pendiente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Cita', citaSchema);
