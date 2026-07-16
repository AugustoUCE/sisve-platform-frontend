# SISVE Frontend Vue

Frontend en Vue 3 para un sistema web de voto electrónico con login, papeleta, resultados y certificado de voto.

## Qué hace el proyecto

La aplicación cubre el flujo principal de un votante:

1. Inicia sesión con cédula y correo institucional.
2. Entra a la papeleta de votación.
3. Selecciona uno o varios candidatos por cargo.
4. Puede marcar voto nulo si aplica.
5. Envía la boleta y luego ve la vista de resultados/certificado.

La UI está preparada para trabajar con backend real o con datos mockeados mientras las APIs no estén disponibles.

## Estructura

```text
src/
  assets/        Estilos globales
  components/    Componentes reutilizables
  layouts/       Estructura compartida de pantalla
  router/        Rutas de la aplicación
  services/      Comunicación con backend y mocks
  stores/        Estado compartido del flujo de voto
  types/         Tipos de dominio
  views/         Vistas HTML, Vue y TypeScript separadas por tipo
```

## Backend y URLs

Las URLs del backend se configuran con variables de entorno. El punto central está en [src/services/http.ts](src/services/http.ts): allí se arma la URL final para cada dominio.

Variables esperadas:

- `VITE_AUTH_API_URL`: base del servicio de autenticación.
- `VITE_ELECTION_API_URL`: base del servicio de elecciones.
- `VITE_VOTE_API_URL`: base del servicio de emisión de voto.
- `VITE_AUDIT_API_URL`: base del servicio de auditoría.
- `VITE_USE_MOCK_DATA=true`: fuerza el uso de datos mockeados.

El archivo [.env.example](.env.example) ya trae una referencia para cada una.

## Flujo de pantallas

- `Login`: captura credenciales y guarda sesión.
- `Dashboard`: muestra la papeleta, los cargos y las tarjetas de candidatos.
- `Results`: resume el voto emitido, muestra estadísticas y genera el certificado imprimible.
- `Audit`: el proyecto todavía lo conserva como pantalla técnica, pero el flujo de votante no depende de ella.

## Cómo funcionan los servicios

- `src/services/auth.ts`: ejecuta el login y guarda la sesión.
- `src/services/voting.ts`: contiene los candidatos mockeados, la validación biométrica simulada y el envío de la boleta.
- `src/services/results.ts`: construye estadísticas y la línea de tiempo de resultados.
- `src/services/admin.ts`: consolida métricas y eventos de soporte.
- `src/services/mockData.ts`: centraliza los datos falsos para desarrollo.

## Estado del flujo

El estado principal del votante vive en `src/stores/voteFlow.ts`. Ahí se guarda:

- candidatos seleccionados
- voto nulo
- última boleta enviada
- perfil del votante usado en el certificado

## Cómo arrancar

1. Instala dependencias.

```bash
npm install
```

2. Copia `.env.example` a `.env` y ajusta las URLs del backend.

3. Si no tienes backend aún, activa mocks con `VITE_USE_MOCK_DATA=true`.

4. Levanta el proyecto.

```bash
npm run dev
```

## Vista de resultados

Después de votar, la aplicación abre una pantalla con:

- número de personas que votaron
- tiempo restante antes del cierre
- certificado de voto imprimible
- resumen de la boleta emitida

El botón de imprimir usa `window.print()` y está pensado para sacar una constancia simple del voto.
