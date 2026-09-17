// components/ModuloResultados.js
// Módulo de Resultados de Laboratorio (construido desde cero), siguiendo el
// mismo patrón que ModuloCitas para mantener el código consistente.

import React, { useState } from "react";
import BuscadorResultados from "./BuscadorResultados";
import PanelResultados from "./PanelResultados";

const API_URL = "http://localhost:4000/api/resultados";

function ModuloResultados() {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [seConsulto, setSeConsulto] = useState(false);

  const consultarResultados = async (documento) => {
    setCargando(true);
    setError(null);
    setSeConsulto(true);

    try {
      const respuesta = await fetch(`${API_URL}/${documento}`);

      if (respuesta.status === 404) {
        setResultados([]);
      } else if (!respuesta.ok) {
        throw new Error("Ocurrió un error al consultar el servidor.");
      } else {
        const datos = await respuesta.json();
        setResultados(datos);
      }
    } catch (err) {
      setError(
        "No fue posible conectar con el servidor de resultados de laboratorio. Verifica que la API esté activa."
      );
      setResultados([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="modulo">
      <h2>Resultados de laboratorio</h2>
      <BuscadorResultados onBuscar={consultarResultados} />
      <PanelResultados
        resultados={resultados}
        cargando={cargando}
        error={error}
        seConsulto={seConsulto}
      />
    </section>
  );
}

export default ModuloResultados;
