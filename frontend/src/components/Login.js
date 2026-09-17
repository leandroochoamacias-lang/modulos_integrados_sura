// components/Login.js
// Componente del módulo de Login: permite iniciar sesión o registrarse.
// El inicio de sesión se hace con el NÚMERO DE DOCUMENTO (no con correo),
// para que sea el mismo dato que identifica al paciente en citas médicas
// y resultados de laboratorio.
// Se muestra cuando aún no hay un usuario autenticado en App.js.

import React, { useState } from "react";

const API_AUTH = "http://localhost:4000/api/auth";

function Login({ onLogin }) {
  const [modo, setModo] = useState("login"); // "login" o "registro"
  const [documento, setDocumento] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("paciente");
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setError(null);
    setMensajeExito(null);
  };

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(`${API_AUTH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documento, contraseña }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.mensaje || "No fue posible iniciar sesión.");
        return;
      }

      onLogin(datos.usuario); // avisa a App.js que ya hay un usuario autenticado
    } catch (err) {
      setError(
        "No fue posible conectar con el servidor. Verifica que la API esté activa."
      );
    } finally {
      setCargando(false);
    }
  };

  const manejarRegistro = async (evento) => {
    evento.preventDefault();
    setCargando(true);
    setError(null);
    setMensajeExito(null);

    try {
      const respuesta = await fetch(`${API_AUTH}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documento, contraseña, rol, nombre }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.mensaje || "No fue posible registrar el usuario.");
        return;
      }

      setMensajeExito("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      cambiarModo("login");
    } catch (err) {
      setError(
        "No fue posible conectar con el servidor. Verifica que la API esté activa."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-contenedor">
      <div className="login-tarjeta">
        <div className="login-tabs">
          <button
            type="button"
            className={modo === "login" ? "activo" : ""}
            onClick={() => cambiarModo("login")}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={modo === "registro" ? "activo" : ""}
            onClick={() => cambiarModo("registro")}
          >
            Registrarme
          </button>
        </div>

        <form onSubmit={modo === "login" ? manejarLogin : manejarRegistro}>
          {modo === "registro" && (
            <>
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </>
          )}

          <label htmlFor="documento">Número de documento</label>
          <input
            id="documento"
            type="text"
            placeholder="Ej: 1035678912"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />

          <label htmlFor="contraseña">Contraseña</label>
          <input
            id="contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />

          {modo === "registro" && (
            <>
              <label htmlFor="rol">Rol</label>
              <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
                <option value="administrador">Administrador</option>
              </select>
            </>
          )}

          <button type="submit" className="login-boton-enviar" disabled={cargando}>
            {cargando ? "Procesando..." : modo === "login" ? "Iniciar sesión" : "Registrarme"}
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}
        {mensajeExito && <p className="login-exito">{mensajeExito}</p>}
      </div>
    </div>
  );
}

export default Login;
