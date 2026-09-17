// components/BuscadorResultados.js
// Componente controlado, análogo a BuscadorCitas.js, para el módulo de
// Resultados de Laboratorio.

import React, { useState } from "react";

function BuscadorResultados({ onBuscar }) {
  const [documento, setDocumento] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (documento.trim() === "") {
      alert("Por favor ingresa un número de documento.");
      return;
    }

    onBuscar(documento.trim());
  };

  return (
    <form className="buscador-citas" onSubmit={manejarEnvio}>
      <label htmlFor="documento-resultados">Número de documento</label>
      <div className="buscador-input-group">
        <input
          id="documento-resultados"
          type="text"
          placeholder="Ej: 1035678912"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
        <button type="submit">Consultar resultados</button>
      </div>
    </form>
  );
}

export default BuscadorResultados;
