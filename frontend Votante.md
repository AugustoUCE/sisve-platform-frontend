# frontend Votante

Este documento describe el frontend de la aplicación "Votante": especificación, estructura y flujo de datos.

## Resumen
- Tecnología: Vue 3 + Vite + TypeScript
- Estado: frontend SPA que consume servicios de elecciones, autenticación y votación.

## Requisitos
- Node.js según `engines` en `package.json`.
- `npm install` para dependencias.

## Comandos útiles
- `npm run dev` — desarrollo (Vite)
- `npm run build` — construir producción
- `npm run preview` — vista previa del build
- `npm run test:unit` — pruebas con Vitest
- `npm run lint` — linting

## Estructura clave
- `src/main.ts` — entrada y montaje de la app
- `src/App.vue` — componente raíz
- `src/router/index.ts` — rutas
- `src/views/` — vistas (e.g. `src/views/dashboard/ballotView.vue`)
- `src/layouts/` — layouts (e.g. `BaseShellLayout.vue`)
- `src/components/` — componentes reutilizables
- `src/services/` — servicios API y lógica de comunicación con backend
  - `api.ts` — cliente HTTP (axios o fetch)
  - `election-service.ts`, `auth-service.ts`, `vote-service.ts`
- `src/interfaces/` — tipos y DTOs
- `public/mockdata/` — JSONs de prueba para desarrollo

## Flujo de datos (alto nivel)
1. Usuario interactúa con UI en una `View`.
2. La `View` solicita datos a `service` correspondiente (p. ej. `election-service`).
3. `service` usa `api.ts` para llamar al backend o leer `public/mockdata/` en desarrollo.
4. Respuesta se mapea a tipos en `src/interfaces` y se devuelve a la `View`.
5. La `View` actualiza estado local o global (Pinia si se usa) y renderiza componentes.
6. Al confirmar acciones (p. ej. votar) se envía un POST al backend y se navega a la siguiente vista.

## Flujo detallado: ejemplo de la papeleta (`BallotView`)
- `onMounted()` ➜ `getActiveElection()` ➜ `getCargos(idEleccion)` ➜ `getCandidates(idCargo)`.
- Los `candidates` rellenan `VoteOptionCard`.
- Usuario selecciona candidato o opción especial (`BLANCO`/`NULO`).
- Al confirmar, `emitirVoto()` construye el payload y llama a `vote-service.emitVote(payload)` o simula el envío, luego redirige a `/certificate`.

## Endpoints y payloads (resumen esperado)
- GET `/active-election` → `{ idEleccion, ... }`
- GET `/elections/:id/cargos` → `Cargo[]`
- GET `/cargos/:id/candidates` → `Candidate[]`
- POST `/votes` → payload: `{ idEleccion, idCargo, idCandidato?, tipoVoto? }`

Ejemplos de payloads:
- Voto a candidato:
```json
{ "idEleccion": 1, "idCargo": 2, "idCandidato": 42 }
```
- Voto especial:
```json
{ "idEleccion": 1, "idCargo": 2, "tipoVoto": "BLANCO" }
```

## Recomendaciones y siguientes pasos
- Mantener `public/mockdata/` sincronizado con contratos API para pruebas offline.
- Añadir diagramas (Mermaid) al README para visualizar el flujo de datos.
- Generar documentación automática de interfaces (`src/interfaces`).

---
Archivo creado: `frontend Votante.md` en la raíz del proyecto.
