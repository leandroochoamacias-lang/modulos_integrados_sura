// components/EstadoBadge.js
// Componente presentacional: recibe el "estado" de una cita como prop
// y muestra una etiqueta con un color distinto según el valor.
// Se separó de CitaItem porque esta misma lógica de colores podría
// reutilizarse en otros módulos del proyecto Sura EPS.

import React from "react";

function EstadoBadge({ estado }) {
  // Definimos un color según el estado recibido
  const colores = {
    Confirmada: { fondo: "#e3f6e8", texto: "#1e7e34" },
    Pendiente: { fondo: "#fff6da", texto: "#8a6d00" },
    Cancelada: { fondo: "#fde3e3", texto: "#b02a2a" },
  };

  // Si el estado no está en el diccionario, usamos un color neutro por defecto
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

export default EstadoBadge;
