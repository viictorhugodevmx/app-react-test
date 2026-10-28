# Notification Rules Builder

Aplicación web para crear, editar y administrar reglas de
notificación configurables, integrada con una API REST y
persistencia en PostgreSQL.

## Tecnologías

### Frontend
- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- Fetch API

### Backend
- Node.js 22.19.0
- Express
- TypeScript
- PostgreSQL 17
- node-postgres (pg)

El backend se mantiene en un repositorio independiente.

## Funcionalidades implementadas

- Listado de reglas recuperadas desde PostgreSQL.
- Creación de reglas mediante un wizard de tres pasos.
- Edición de reglas existentes.
- Activación y desactivación persistente.
- Tres disparadores:
  - Cliente creado.
  - Pago recibido.
  - Ticket sin respuesta.
- Condiciones dinámicas con operadores compatibles.
- Combinación de condiciones mediante AND u OR.
- Acciones configurables:
  - Email.
  - SMS.
  - Webhook.
- Validación de nombres, condiciones y acciones.
- Detección de nombres duplicados (HTTP 409).
- Manejo de errores de API y conexión.
- Estados de carga y notificaciones visuales.
- Diseño responsive.

## Requisitos

- Node.js 22.19.0 y npm.
- Backend Notification Rules en ejecución.
- PostgreSQL configurado para el backend.

## Instalación del frontend

```bash
npm install
cp .env.example .env.local
```

Configurar `.env.local`:

```dotenv
VITE_API_BASE_URL=http://localhost:3001/api
```

Iniciar el frontend:

```bash
npm run dev
```

Abrir:

http://localhost:5173

El archivo `.env.local` es local y no debe subirse a Git.

## Configuración del backend

El backend utiliza su propio proyecto y archivo `.env`.

Consultar su README y los documentos:

- `docs/API_CONTRACT.md`
- `docs/DATABASE.md`

Es necesario configurar PostgreSQL y aplicar el esquema SQL
antes de utilizar la API.

Iniciar el backend desde su propio directorio:

```bash
npm run dev
```

API local:

http://localhost:3001/api

## Flujo de funcionamiento

1. React solicita las reglas al backend mediante HTTP.
2. Express procesa y valida cada solicitud.
3. PostgreSQL almacena reglas, condiciones y acciones.
4. La API devuelve el resultado confirmado.
5. React actualiza la interfaz.

Los datos persisten al recargar el navegador y al reiniciar
el servidor.

## Endpoints utilizados

| Método | Endpoint | Propósito |
|---|---|---|
| GET | /api/rules | Listar reglas |
| GET | /api/rules/:ruleId | Obtener regla completa |
| POST | /api/rules | Crear regla |
| PUT | /api/rules/:ruleId | Editar regla |
| PATCH | /api/rules/:ruleId/status | Cambiar estado |

El identificador UUID principal se genera en el backend.

## Validaciones y errores

El frontend valida los campos del formulario antes de guardar.

El backend aplica sus propias reglas de negocio y devuelve
errores HTTP estructurados.

Ejemplos:

- 409: nombre duplicado.
- 422: datos de regla inválidos.
- 404: regla inexistente.
- Errores de red: conexión no disponible.

Una solicitud fallida no debe mostrar un guardado exitoso.

## Notificaciones

- Éxito: notificación flotante que desaparece en 4 segundos.
- Error: notificación que puede cerrarse manualmente.
- Carga: indicador mientras se procesa la solicitud.
- Validación: mensajes junto a los campos del wizard.

## Comandos del frontend

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Validación

Frontend:

```bash
npm run lint
npm run build
git diff --check
```

Backend, desde su propio directorio:

```bash
npm run typecheck
npm run build
npm test
```

Las pruebas automáticas del backend utilizan una base de
datos de pruebas independiente.

Las pruebas funcionales del frontend se realizan manualmente
en el navegador.

## Limitaciones actuales

- Las acciones Email, SMS y Webhook se configuran y almacenan,
  pero no se ejecutan ni envían notificaciones reales.
- El proyecto no incluye autenticación.
- No hay una suite automatizada de pruebas del frontend.
- El despliegue de producción no forma parte de esta etapa.

## Estructura principal

```text
src/
├── components/
│   ├── RulesTable.tsx
│   ├── RuleEditor.tsx
│   └── NotificationToast.tsx
├── config/
├── services/
│   └── rulesApi.ts
├── types/
├── utils/
└── App.tsx
```

## Documentación

La versión en inglés está disponible en
[README.en.md](README.en.md).
