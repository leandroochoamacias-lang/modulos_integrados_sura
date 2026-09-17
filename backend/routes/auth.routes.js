// routes/auth.routes.js
// Endpoints del módulo de Login: registro, inicio de sesión y cierre de sesión.
// El inicio de sesión se hace con el NÚMERO DE DOCUMENTO (no con correo),
// para que sea el mismo dato que identifica al paciente en los módulos de
// citas médicas y resultados de laboratorio.
// Respecto al proyecto original (loginprincipal) se agrega:
//   - hash de contraseña con bcrypt (requerimiento no funcional: seguridad de la información)
//   - manejo de rol (paciente / medico / administrador)
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Endpoint de REGISTRO
// POST /api/auth/registro
router.post('/registro', async (req, res) => {
    try {
        const { documento, contraseña, rol, nombre } = req.body;

        if (!documento || !contraseña) {
            return res.status(400).json({ mensaje: 'El documento y la contraseña son obligatorios' });
        }

        const existe = await Usuario.findOne({ documento });
        if (existe) {
            return res.status(409).json({ mensaje: 'Ya existe un usuario registrado con ese documento' });
        }

        // La contraseña nunca se guarda en texto plano
        const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = new Usuario({
            documento,
            contraseña: contraseñaHasheada,
            rol: rol || 'paciente',
            nombre: nombre || ''
        });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// Endpoint de LOGIN
// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { documento, contraseña } = req.body;

        const usuarioEncontrado = await Usuario.findOne({ documento });
        if (!usuarioEncontrado) {
            return res.status(401).json({ mensaje: 'Error en la autenticación' });
        }

        const coincide = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña);
        if (!coincide) {
            return res.status(401).json({ mensaje: 'Error en la autenticación' });
        }

        res.status(200).json({
            mensaje: 'Autenticación satisfactoria',
            usuario: {
                documento: usuarioEncontrado.documento,
                rol: usuarioEncontrado.rol,
                nombre: usuarioEncontrado.nombre
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// Endpoint de CIERRE DE SESIÓN
// POST /api/auth/logout
// Como la autenticación es simple (sin tokens todavía), el cierre de sesión
// real ocurre en el front-end (se borra el usuario guardado en el estado).
// Este endpoint queda documentado como punto de extensión para cuando se
// agreguen JWT o sesiones de servidor.
router.post('/logout', (req, res) => {
    res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
});

module.exports = router;
