# Sura EPS — Sistema Integrado

Proyecto formativo SENA — Evidencias **GA8-220501096-AA1-EV01** (Desarrollar
software a partir de la integración de sus módulos componentes) y
**GA8-220501096-AA1-EV02** (Módulos integrados).

## 1. Descripción general

Este proyecto integra en una sola aplicación los tres módulos trabajados en
actividades anteriores:

| Módulo | Origen | Evidencia previa |
|---|---|---|
| Login (registro / inicio de sesión / cierre de sesión) | Proyecto `loginprincipal` | GA7-220501096-AA5 |
| Citas médicas (consulta, agendar, modificar, cancelar) | Proyecto `Sura EPS - Consulta de Citas Médicas` | GA7-220501096-AA4-EV03 |
| Resultados de laboratorio | Nuevo, construido para esta evidencia | GA8-220501096-AA1 |

## 2. Arquitectura

```
                ┌───────────────────────────┐
                │   Frontend (React, SPA)   │
                │  Login / Citas / Result.  │
                └─────────────┬─────────────┘
                              │ fetch (HTTP/JSON)
                              ▼
                ┌───────────────────────────┐
                │  Backend (Node + Express) │
                │  /api/auth                │
                │  /api/citas                │
                │  /api/resultados           │
                └─────────────┬─────────────┘
                              │ Mongoose
                              ▼
                ┌───────────────────────────┐
                │  MongoDB Atlas             │
                │  BD única: suraIntegradoDB │
                │  colecciones: usuarios,    │
                │  citas, resultados         │
                └───────────────────────────┘
```

**Decisión de integración:** se unificó todo en **una sola base de datos**
(`suraIntegradoDB`) y **un solo backend Express**, en lugar de mantener
servicios separados, para simplificar el despliegue y reflejar que los tres
módulos pertenecen a un mismo sistema de información de Sura EPS.

## 3. Capas y componentes por módulo

- **Capa de presentación:** componentes React (`Login`, `ModuloCitas`,
  `ModuloResultados`, `NavegacionModulos`, y los componentes de UI de cada
  módulo).
- **Capa de servicios (API):** rutas Express (`routes/auth.routes.js`,
  `routes/citas.routes.js`, `routes/resultados.routes.js`).
- **Capa de datos:** modelos Mongoose (`models/Usuario.js`, `models/Cita.js`,
  `models/Resultado.js`) y conexión única (`config/db.js`).

## 4. Seguridad implementada

- Contraseñas cifradas con `bcryptjs` (nunca se guardan en texto plano).
- Roles de usuario (`paciente`, `medico`, `administrador`) para futura
  restricción de acceso por perfil.
- CORS habilitado solo para que el front-end autorizado consuma la API.

## 5. Endpoints de la API

### Login (`/api/auth`)
| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/auth/registro | Registra un nuevo usuario |
| POST | /api/auth/login | Autentica un usuario |
| POST | /api/auth/logout | Cierra sesión |

### Citas médicas (`/api/citas`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/citas | Lista todas las citas |
| GET | /api/citas/:documento | Consulta citas por documento del paciente |
| POST | /api/citas | Agenda una nueva cita |
| PUT | /api/citas/:id | Modifica una cita existente |
| DELETE | /api/citas/:id | Cancela (elimina) una cita |

### Resultados de laboratorio (`/api/resultados`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/resultados | Lista todos los resultados |
| GET | /api/resultados/:documento | Consulta resultados por documento del paciente |
| POST | /api/resultados | Registra un nuevo examen |
| PUT | /api/resultados/:id | Actualiza un resultado (estado, valor, observaciones) |

## 6. Cómo ejecutar el proyecto

### Backend
```bash
cd backend
npm install
npm run seed   # (una sola vez) carga las citas de prueba en MongoDB
npm run dev    # servidor en http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm start      # aplicación en http://localhost:3000
```

> El backend unificado corre en el puerto **4000** (antes `loginprincipal`
> usaba el puerto 3005 y el proyecto de citas médicas el 4000; se conservó el
> 4000 porque ya era el que consumía el front-end de React).

## 7. Pruebas realizadas

- Registro e inicio de sesión probados con distintos roles (paciente,
  médico, administrador).
- Consulta de citas médicas por documento, usando los datos migrados desde
  `data.json` del proyecto original.
- Registro y consulta de resultados de laboratorio de prueba.
- Verificación de que una contraseña incorrecta o un documento inexistente
  devuelven el mensaje de error esperado (401 / 404).

## 8. Repositorios de los proyectos originales

- Login: https://github.com/leandroochoamacias-lang/loginprincipal
- Citas médicas: https://github.com/leandroochoamacias-lang/Eps_sura_citas.git
