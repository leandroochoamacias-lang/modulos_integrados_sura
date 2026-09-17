// components/TablaCitas.js
// Componente de lista: recibe el arreglo "citas" y renderiza un CitaItem
// por cada elemento, usando el método .map(). React exige una "key" única
// por cada elemento de una lista para optimizar el re-renderizado.

import React from "react";
import CitaItem from "./CitaItem";

function TablaCitas({ citas }) {
  return (
    <table className="tabla-citas">
      <thead>
        <tr>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {citas.map((cita) => (
          <CitaItem key={cita._id} cita={cita} />
        ))}
      </tbody>
    </table>
  );
}

export default TablaCitas;
