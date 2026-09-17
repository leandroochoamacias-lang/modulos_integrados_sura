// routes/resultados.routes.js
// Endpoints del módulo de Resultados de Laboratorio (construido desde cero).
const express = require('express');
const router = express.Router();
const Resultado = require('../models/Resultado');

// GET /api/resultados/:documento
// Consulta los resultados de laboratorio de un paciente por su documento.
router.get('/:documento', async (req, res) => {
    try {
        const { documento } = req.params;
        const resultadosEncontrados = await Resultado.find({ documentoPaciente: documento });

        if (resultadosEncontrados.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontraron resultados de laboratorio para el documento ingresado.'
            });
        }

        return res.status(200).json(resultadosEncontrados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// GET /api/resultados
// Devuelve todos los resultados (útil para pruebas y para el personal médico/laboratorio).
router.get('/', async (req, res) => {
    try {
        const resultados = await Resultado.find();
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// POST /api/resultados
// Registra un nuevo examen de laboratorio (normalmente en estado "pendiente").
router.post('/', async (req, res) => {
    try {
        const { documentoPaciente, tipoExamen, fechaExamen, resultado, estado, observaciones } = req.body;

        if (!documentoPaciente || !tipoExamen || !fechaExamen) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios para registrar el examen' });
        }

        const nuevoResultado = new Resultado({
            documentoPaciente, tipoExamen, fechaExamen, resultado, estado, observaciones
        });
        await nuevoResultado.save();

        res.status(201).json({ mensaje: 'Examen registrado con éxito', resultado: nuevoResultado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

// PUT /api/resultados/:id
// Actualiza un resultado: típicamente para pasar de "pendiente" a "listo" o
// "entregado", o para cargar el valor del resultado y observaciones.
router.put('/:id', async (req, res) => {
    try {
        const resultadoActualizado = await Resultado.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!resultadoActualizado) {
            return res.status(404).json({ mensaje: 'Resultado no encontrado' });
        }

        res.status(200).json({ mensaje: 'Resultado actualizado con éxito', resultado: resultadoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

module.exports = router;
