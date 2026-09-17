// components/EstadoResultadoBadge.js
// Análogo a EstadoBadge.js, pero con los tres estados del módulo de
// Resultados de Laboratorio: pendiente, listo, entregado.

import React from "react";

function EstadoResultadoBadge({ estado }) {
  const colores = {
    pendiente: { fondo: "#fff6da", texto: "#8a6d00" },
    listo: { fondo: "#e3f0f6", texto: "#0a5a8a" },
    entregado: { fondo: "#e3f6e8", texto: "#1e7e34" },
  };

  const color = colores[estado] || { fondo: "#eee", texto: "#555" };

  return (
    <span
      className="estado-badge"
      style={{ backgroundColor: color.fondo, color: color.texto }}
    >
      {estado}
    </span>
  );
}

export default EstadoResultadoBadge;
