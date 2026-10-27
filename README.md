# Notification Rules Builder

Aplicación web para crear y administrar reglas de notificación mediante disparadores, condiciones y acciones.

## Tecnologías

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## Instalación

Requisitos: Node.js y npm.

```bash
npm install
npm run dev
```

Abrir la dirección local indicada por Vite.

## Comandos disponibles

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Estado actual

El frontend se encuentra en preparación.

Actualmente incluye:
- Listado de reglas con datos de ejemplo.
- Activación y desactivación mediante estado local.
- Configuración inicial de React, TypeScript y Tailwind.

## Funcionalidades previstas

- Crear y editar reglas.
- Seleccionar disparadores.
- Configurar condiciones dinámicas.
- Definir acciones Email, SMS y Webhook.
- Validar formularios.
- Integrar una API REST para persistencia.

## Decisiones técnicas

- React Hooks para el estado de la interfaz.
- TypeScript para definir los modelos de datos.
- Tailwind CSS como herramienta principal de estilos.
- Componentes con responsabilidades claras.
- Funciones y variables con nombres descriptivos en inglés.

## Limitaciones actuales

- Los datos son temporales y se reinician al recargar.
- No existe integración con el backend.
- El editor de reglas está pendiente de implementación.

## Documentación

La versión en inglés está disponible en [README.en.md](README.en.md).
