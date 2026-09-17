// components/PanelResultados.js
// Análogo a ResultadoCitas.js: centraliza la lógica de qué mostrar según
// el estado de la consulta (cargando, error, sin resultados, o la tabla).

import React from "react";
import Loader from "./Loader";
import MensajeAlerta from "./MensajeAlerta";
import TablaResultados from "./TablaResultados";

function PanelResultados({ resultados, cargando, error, seConsulto }) {
  if (cargando) {
    return <Loader mensaje="Consultando resultados de laboratorio..." />;
  }

  if (error) {
    return <MensajeAlerta tipo="error" mensaje={error} />;
  }

  if (seConsulto && resultados.length === 0) {
    return (
      <MensajeAlerta
        tipo="info"
        mensaje="No se encontraron resultados de laboratorio para el documento ingresado."
      />
    );
  }

  if (resultados.length > 0) {
    return <TablaResultados resultados={resultados} />;
  }

  return (
    <MensajeAlerta
      tipo="info"
      mensaje="Ingresa el número de documento para consultar resultados de laboratorio."
    />
  );
}

export default PanelResultados;
