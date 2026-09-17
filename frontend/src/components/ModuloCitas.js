// components/ModuloCitas.js
// Módulo de Citas Médicas. Contiene la misma lógica que antes vivía en
// App.js del proyecto original, ahora aislada en su propio componente para
// convivir con los módulos de Login y Resultados de Laboratorio.

import React, { useState } from "react";
import BuscadorCitas from "./BuscadorCitas";
import ResultadoCitas from "./ResultadoCitas";

const API_URL = "http://localhost:4000/api/citas";

function ModuloCitas() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [seConsulto, setSeConsulto] = useState(false);

  const consultarCitas = async (documento) => {
    setCargando(true);
    setError(null);
    setSeConsulto(true);

    try {
      const respuesta = await fetch(`${API_URL}/${documento}`);

      if (respuesta.status === 404) {
        setCitas([]);
      } else if (!respuesta.ok) {
        throw new Error("Ocurrió un error al consultar el servidor.");
      } else {
        const datos = await respuesta.json();
        setCitas(datos);
      }
    } catch (err) {
      setError(
        "No fue posible conectar con el servidor de citas médicas. Verifica que la API esté activa."
      );
      setCitas([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="modulo">
      <h2>Consulta de citas médicas</h2>
      <BuscadorCitas onBuscar={consultarCitas} />
      <ResultadoCitas
        citas={citas}
        cargando={cargando}
        error={error}
        seConsulto={seConsulto}
      />
    </section>
  );
}

export default ModuloCitas;
