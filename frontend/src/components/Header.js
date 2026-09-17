// components/Header.js
// Componente presentacional estático: encabezado de la aplicación.
// No recibe props porque su contenido no cambia.

import React from "react";

function Header() {
  return (
    <header className="app-header">
      <h1>Sura EPS</h1>
    </header>
  );
}

export default Header;
