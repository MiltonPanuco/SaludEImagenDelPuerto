# Frontend

Web React/Vite de Salud e Imagen del Puerto, servida por Cloudflare Workers.

## Configuración

Copia `.env.example` como `.env` y agrega el token público de Mapbox:

```dotenv
VITE_MAPBOX_ACCESS_TOKEN=tu_token_publico
```

El contenido se solicita a `/api/content`. En desarrollo, Vite consulta Sanity;
en producción, el Worker actúa como proxy y aplica caché y headers de seguridad.
No se expone ningún token de escritura de Sanity.

## Comandos

```powershell
npm install
npm run dev
npm run check
npm test
npm run build
```

Con el servidor local activo, `npm run test:e2e` revisa las 14 rutas en móvil,
tablet y escritorio, además de comprobar directamente las 28 URLs públicas en
español e inglés.

## Despliegue

El build se genera en `dist/`. Desde la raíz del proyecto, `wrangler.jsonc`
publica esa carpeta y ejecuta `server/worker.js` para SEO, sitemap, robots y la
conexión con Sanity.
