// components/MensajeAlerta.js
// Componente presentacional reutilizable: muestra un mensaje de tipo
// "info" (ej. sin resultados) o "error" (ej. falla de conexión con la API).
// Cambia su estilo según la prop "tipo".

import React from "react";

function MensajeAlerta({ tipo, mensaje }) {
  const clase = tipo === "error" ? "alerta alerta-error" : "alerta alerta-info";

  return (
    <div className={clase}>
      <p>{mensaje}</p>
    </div>
  );
}

export default MensajeAlerta;
