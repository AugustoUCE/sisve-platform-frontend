# SISVE Frontend Vue

Base de frontend en Vue 3 para el backend SISVE.

## Qué cubre esta carpeta

- `auth-service`: login y sesión.
- `election-service`: listado y detalle de elecciones.
- `vote-service`: emisión del voto.
- `audit-service`: trazabilidad y eventos.

## Estructura propuesta

```text
frontend-vue/
  src/
    assets/
    components/
    layouts/
    router/
    services/
    stores/
    types/
    views/
```

## Cómo se conecta con el backend

El proyecto usa variables de entorno para apuntar a cada servicio:

- `VITE_AUTH_API_URL`
- `VITE_ELECTION_API_URL`
- `VITE_VOTE_API_URL`
- `VITE_AUDIT_API_URL`

## Cómo arrancar el frontend

1. Instala dependencias:
```bash
npm install
```

2. Crea un archivo `.env` en la raíz del frontend copiando `.env.example` y ajusta las URLs si necesitas apuntar a otro entorno.

Mientras los endpoints reales no existan, la UI funciona con datos de ejemplo y deja lista la capa de servicios para conectar las APIs.

## Vistas incluidas

- `Dashboard`: resumen operativo.
- `Login`: acceso al sistema.
- `Elections`: listado de procesos electorales.
- `Election detail`: candidatos, fechas y estado.
- `Vote`: formulario de sufragio.
- `Audit`: eventos y trazabilidad.
