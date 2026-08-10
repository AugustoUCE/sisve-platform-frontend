# frontend-votante

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### Como esta organizado el proyecto:
assets/ 
- Aqui se pone todos los recursos estaticos(no contiene logica)
components/
- Aqui va todos los componentes reutilizables(sirve en varios lugares del codigo)
views/
- Donde van las vistas del proyecto
layouts/
- Aqui se define la estructura de una pagina(como una vista estatica)
router/
- Contiene todas las rutas
services/
- Aqui se implementa el backend del proyecto(Avios o Fetch)
### FLUJO

Usuario entra

↓

main.ts

↓

App.vue

↓

Router

↓

View

↓

Layout

↓

Componentes

↓

Services

↓

Backend

### Flujo de datos de votación

1. El usuario inicia sesión en `LoginView.vue`.
2. `auth-service.ts` envía las credenciales al backend de autenticación.
3. Si el login es correcto, se guarda `token` y `student` en `localStorage`.
4. El usuario entra a `BallotView.vue`.
5. `election-service.ts` consulta la elección activa, los cargos y los candidatos.
6. El usuario selecciona una candidatura o un voto especial (`BLANCO` o `NULO`).
7. Al confirmar, `BallotView.vue` construye el request con `idVotante`, `idEleccion`, `idCargo` y el voto seleccionado.
8. `vote-service.ts` hace un `POST` a `${VITE_VOTE_API_URL}/votos` con el token en `Authorization`.
9. Si el backend responde bien, la app redirige a `CertificateView.vue`.
10. `CertificateView.vue` lee los datos del votante, valida el token, muestra el certificado e imprime la boleta.
11. Después de imprimir, se limpia `token` y `student` del navegador.


