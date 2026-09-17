// components/Loader.js
// Componente presentacional simple: se muestra mientras la petición a la
// API está en curso. Ahora acepta un "mensaje" opcional para poder
// reutilizarse en los distintos módulos (citas, resultados, etc.).

import React from "react";

function Loader({ mensaje }) {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      <p>{mensaje || "Cargando..."}</p>
    </div>
  );
}

export default Loader;
