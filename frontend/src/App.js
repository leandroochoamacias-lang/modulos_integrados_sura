// App.js
// Componente raíz de la aplicación integrada. Ya no contiene la lógica de
// un único módulo: ahora decide qué mostrar según si hay un usuario
// autenticado (módulo de Login) y, si lo hay, entre qué módulos navegar
// (Citas médicas / Resultados de laboratorio).

import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import NavegacionModulos from "./components/NavegacionModulos";
import ModuloCitas from "./components/ModuloCitas";
import ModuloResultados from "./components/ModuloResultados";

function App() {
  // Usuario autenticado (null mientras no ha iniciado sesión)
  const [usuario, setUsuario] = useState(null);
  // Módulo que se está mostrando actualmente: "citas" o "resultados"
  const [moduloActivo, setModuloActivo] = useState("citas");

  const manejarLogin = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const manejarLogout = () => {
    setUsuario(null);
    setModuloActivo("citas");
  };

  return (
    <div className="app-contenedor">
      <Header />

      <main className="app-main">
        {!usuario ? (
          <Login onLogin={manejarLogin} />
        ) : (
          <>
            <NavegacionModulos
              moduloActivo={moduloActivo}
              onCambiarModulo={setModuloActivo}
              usuario={usuario}
              onLogout={manejarLogout}
            />

            {moduloActivo === "citas" ? <ModuloCitas /> : <ModuloResultados />}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
