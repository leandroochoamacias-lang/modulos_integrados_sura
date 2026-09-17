// components/Footer.js
// Componente presentacional estático: pie de página de la aplicación.

import React from "react";

function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Sura EPS - Proyecto formativo SENA</p>
    </footer>
  );
}

export default Footer;
