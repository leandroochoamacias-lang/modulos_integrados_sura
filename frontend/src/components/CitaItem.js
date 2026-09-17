// components/CitaItem.js
// Componente presentacional: representa UNA fila de la tabla de citas.
// Recibe el objeto "cita" completo por props y solo se encarga de mostrarlo.

import React from "react";
import EstadoBadge from "./EstadoBadge";

function CitaItem({ cita }) {
  return (
    <tr className="cita-item">
      <td>{cita.especialidad}</td>
      <td>{cita.medico}</td>
      <td>{cita.fecha}</td>
      <td>{cita.hora}</td>
      <td>
        <EstadoBadge estado={cita.estado} />
      </td>
    </tr>
  );
}

export default CitaItem;
