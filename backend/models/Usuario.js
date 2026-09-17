// models/Usuario.js
// Define la estructura del documento "Usuario" en MongoDB.
// El inicio de sesión se hace con el NÚMERO DE DOCUMENTO del usuario
// (en vez de correo electrónico), para que coincida con el mismo dato que
// se usa para consultar citas médicas y resultados de laboratorio.
// También se amplía respecto al proyecto original (loginprincipal) con el
// campo "rol" para el requerimiento funcional "Gestión de perfil": el
// sistema debe permitir el inicio de sesión seguro según el rol del usuario
// (médico, paciente, administrador).
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    documento: {
        type: String,
        required: true,
        unique: true // no permite usuarios duplicados
    },
    contraseña: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['paciente', 'medico', 'administrador'],
        default: 'paciente'
    },
    nombre: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
