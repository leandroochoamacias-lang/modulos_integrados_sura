// components/BuscadorCitas.js
// Componente controlado: el valor del input está sincronizado con el
// estado de React (useState), que es la forma recomendada de manejar
// formularios en React (a diferencia del manejo tradicional del DOM).

import React, { useState } from "react";

function BuscadorCitas({ onBuscar }) {
  const [documento, setDocumento] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault(); // evita que la página se recargue al enviar el formulario

    if (documento.trim() === "") {
      alert("Por favor ingresa un número de documento.");
      return;
    }

    onBuscar(documento.trim()); // avisamos al componente padre (App) que se debe consultar
  };

  return (
    <form className="buscador-citas" onSubmit={manejarEnvio}>
      <label htmlFor="documento">Número de documento</label>
      <div className="buscador-input-group">
        <input
          id="documento"
          type="text"
          placeholder="Ej: 1035678912"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
        <button type="submit">Consultar citas</button>
      </div>
    </form>
  );
}

export default BuscadorCitas;
