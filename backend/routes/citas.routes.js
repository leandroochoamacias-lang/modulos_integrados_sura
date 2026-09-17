// routes/citas.routes.js
// Endpoints del módulo de Citas Médicas.
// A diferencia del proyecto original (que leía backend/data.json en memoria),
// ahora las citas se leen y escriben en MongoDB, para que queden integradas
// con el resto del sistema y persistan entre reinicios del servidor.
const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');

// GET /api/citas/:documento
// Consulta las citas médicas asociadas a un número de documento.
router.get('/:documento', async (req, res) => {
    try {
        const { documento } = req.params;
        const citasEncontradas = await Cita.find({ documento });

        if (citasEncontradas.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontraron citas médicas para el documento ingresado.'
            });
        }

        return res.status(200).json(citasEncontradas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// GET /api/citas
// Devuelve todas las citas registradas (útil para pruebas y para el rol administrador).
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.find();
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// POST /api/citas
// Agenda una nueva cita médica.
router.post('/', async (req, res) => {
    try {
        const { documento, paciente, especialidad, medico, fecha, hora } = req.body;

        if (!documento || !paciente || !especialidad || !medico || !fecha || !hora) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios para agendar la cita' });
        }

        const nuevaCita = new Cita({
            documento, paciente, especialidad, medico, fecha, hora
        });
        await nuevaCita.save();

        res.status(201).json({ mensaje: 'Cita agendada con éxito', cita: nuevaCita });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// PUT /api/citas/:id
// Modifica una cita existente (fecha, hora, estado, etc.).
router.put('/:id', async (req, res) => {
    try {
        const citaActualizada = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!citaActualizada) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }

        res.status(200).json({ mensaje: 'Cita actualizada con éxito', cita: citaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// DELETE /api/citas/:id
// Cancela (elimina) una cita.
// Nota: también se puede "cancelar" sin borrar, usando PUT para poner estado: "Cancelada".
router.delete('/:id', async (req, res) => {
    try {
        const citaEliminada = await Cita.findByIdAndDelete(req.params.id);

        if (!citaEliminada) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }

        res.status(200).json({ mensaje: 'Cita cancelada con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

module.exports = router;
