# Notification Rules Builder

Aplicación full stack para crear, editar y administrar
reglas de notificación configurables.

## Demo pública

**Aplicación:**
https://notification-rules-demo.netlify.app

**API:**
https://notification-rules-backend.onrender.com/api

**Estado:** Desplegada y validada funcionalmente.

## Arquitectura

| Capa | Tecnología | Hosting |
|---|---|---|
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind CSS 4 | Netlify |
| Backend | Node.js 22.19.0, Express, TypeScript | Render |
| Base de datos | PostgreSQL 18 | Neon |

Repositorio del backend:
https://github.com/viictorhugodevmx/notification-rules-backend

## Funcionalidades

- Listado persistente de reglas.
- Wizard de creación en tres pasos.
- Edición de reglas existentes.
- Activación y desactivación persistente.
- Disparadores: cliente creado, pago recibido y ticket sin respuesta.
- Condiciones dinámicas con lógica AND/OR.
- Acciones configurables de Email, SMS y Webhook.
- Validaciones de formularios.
- Errores HTTP, incluyendo conflictos de nombres (409).
- Notificaciones visuales y estados de carga.
- Interfaz responsive.

## Desarrollo local

Requisitos: Node.js 22.19.0, npm y backend configurado.

```bash
npm install
cp .env.example .env.local
```

Configurar `.env.local`:

```dotenv
VITE_API_BASE_URL=http://localhost:3001/api
```

Iniciar:

```bash
npm run dev
```

Frontend local: http://localhost:5173

El archivo `.env.local` no se versiona.

## Despliegue

El frontend se despliega desde la rama `main` mediante Netlify.

Configuración:

- Build command: `npm run build`
- Publish directory: `dist`
- Variable: `VITE_API_BASE_URL`
- Valor: `https://notification-rules-backend.onrender.com/api`

Vite incorpora las variables VITE_* durante la compilación.
Si cambia su valor, es necesario reconstruir el sitio.

El backend está publicado en Render con CORS configurado
para permitir el dominio de Netlify.

PostgreSQL está alojado en Neon y conserva los datos
independientemente del navegador.

## API REST

| Método | Ruta | Operación |
|---|---|---|
| GET | /api/rules | Listar reglas |
| GET | /api/rules/:ruleId | Obtener regla |
| POST | /api/rules | Crear regla |
| PUT | /api/rules/:ruleId | Editar regla |
| PATCH | /api/rules/:ruleId/status | Cambiar estado |

La API genera los UUID de las reglas.

## Pruebas realizadas

- Creación de reglas en producción.
- Edición con persistencia después de F5.
- Activación y desactivación persistente.
- Recuperación de condiciones y acciones.
- Rechazo de nombres duplicados con HTTP 409.
- Comunicación React, Express y PostgreSQL.
- Verificación de respuestas HTTP y CORS.
- Pruebas manuales de interfaz.
- Compilación de TypeScript y Vite.

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Alcance y limitaciones

- Las acciones Email, SMS y Webhook se configuran y
  almacenan, pero no realizan envíos reales.
- No existe autenticación ni autorización.
- La API pública permite operaciones de modificación;
  usar exclusivamente datos ficticios de demostración.
- No hay pruebas frontend automatizadas.
- El alojamiento gratuito de Render puede suspender
  el backend por inactividad y demorar la primera petición.

Esta implementación es una demostración técnica y no
un servicio preparado para datos sensibles.

## Estructura principal

```text
src/
├── components/
├── config/
├── services/
│   └── rulesApi.ts
├── types/
├── utils/
└── App.tsx
```

## Documentación

English version: [README.en.md](README.en.md).
