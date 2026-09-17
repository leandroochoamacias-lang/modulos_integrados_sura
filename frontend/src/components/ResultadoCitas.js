// components/ResultadoCitas.js
// Componente contenedor: decide QUÉ mostrar según el estado actual
// (cargando, error, sin resultados o la tabla con las citas encontradas).
// Centraliza esta decisión para que App.js no se llene de lógica de renderizado.

import React from "react";
import Loader from "./Loader";
import MensajeAlerta from "./MensajeAlerta";
import TablaCitas from "./TablaCitas";

function ResultadoCitas({ citas, cargando, error, seConsulto }) {
  if (cargando) {
    return <Loader />;
  }

  if (error) {
    return <MensajeAlerta tipo="error" mensaje={error} />;
  }

  if (seConsulto && citas.length === 0) {
    return (
      <MensajeAlerta
        tipo="info"
        mensaje="No se encontraron citas médicas para el documento ingresado."
      />
    );
  }

  if (citas.length > 0) {
    return <TablaCitas citas={citas} />;
  }

  // Estado inicial: aún no se ha realizado ninguna consulta
  return (
    <MensajeAlerta
      tipo="info"
      mensaje="Ingresa tu número de documento para consultar tus citas médicas."
    />
  );
}

export default ResultadoCitas;
