// components/TablaResultados.js
// Análogo a TablaCitas.js: renderiza un ResultadoItem por cada resultado.

import React from "react";
import ResultadoItem from "./ResultadoItem";

function TablaResultados({ resultados }) {
  return (
    <table className="tabla-citas">
      <thead>
        <tr>
          <th>Tipo de examen</th>
          <th>Fecha</th>
          <th>Resultado</th>
          <th>Estado</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {resultados.map((r) => (
          <ResultadoItem key={r._id} resultado={r} />
        ))}
      </tbody>
    </table>
  );
}

export default TablaResultados;
