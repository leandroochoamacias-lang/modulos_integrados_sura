// components/ResultadoItem.js
// Análogo a CitaItem.js: representa UNA fila de la tabla de resultados.

import React from "react";
import EstadoResultadoBadge from "./EstadoResultadoBadge";

function ResultadoItem({ resultado }) {
  return (
    <tr className="cita-item">
      <td>{resultado.tipoExamen}</td>
      <td>{resultado.fechaExamen}</td>
      <td>{resultado.resultado || "—"}</td>
      <td>
        <EstadoResultadoBadge estado={resultado.estado} />
      </td>
      <td>{resultado.observaciones || "—"}</td>
    </tr>
  );
}

export default ResultadoItem;
