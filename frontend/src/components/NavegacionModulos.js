// components/NavegacionModulos.js
// Barra que permite cambiar entre los módulos disponibles una vez el usuario
// ya inició sesión, y muestra sus datos junto con el botón de cerrar sesión
// (requerimiento funcional: cierre de sesión seguro).

import React from "react";

function NavegacionModulos({ moduloActivo, onCambiarModulo, usuario, onLogout }) {
  return (
    <div className="navegacion-modulos">
      <div className="navegacion-tabs">
        <button
          type="button"
          className={moduloActivo === "citas" ? "activo" : ""}
          onClick={() => onCambiarModulo("citas")}
        >
          Citas médicas
        </button>
        <button
          type="button"
          className={moduloActivo === "resultados" ? "activo" : ""}
          onClick={() => onCambiarModulo("resultados")}
        >
          Resultados de laboratorio
        </button>
      </div>

      <div className="navegacion-usuario">
        <span>
          {usuario.nombre || usuario.documento} · <strong>{usuario.rol}</strong>
        </span>
        <button type="button" className="boton-logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default NavegacionModulos;
