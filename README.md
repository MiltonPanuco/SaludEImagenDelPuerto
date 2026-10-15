# Salud e Imagen del Puerto

Sitio bilingüe de Salud e Imagen del Puerto. El diseño vive en React y el
contenido editable se administra en Sanity.

## Estructura

- `frontend/`: web React/Vite, pruebas y Worker de Cloudflare.
- `sanity/`: Studio, esquemas y carga inicial de contenido.
- `wrangler.jsonc`: configuración del despliegue web.

## Flujo de contenido

1. El cliente publica cambios en Sanity Studio.
2. La web consulta `/api/content`.
3. El Worker obtiene los documentos públicos de Sanity y mantiene una caché de
   60 segundos.
4. Si Sanity no responde, la web conserva contenido local de respaldo.

## Desarrollo

Cada paquete administra sus dependencias por separado:

```powershell
cd frontend
npm install
npm run dev
```

```powershell
cd sanity
npm install
npm run dev
```

Consulta los README de cada carpeta para los comandos específicos.

## Antes de publicar

```powershell
cd frontend
npm run check
npm test
npm run build
```

El despliegue usa `frontend/dist` mediante Cloudflare Workers. No guardes
tokens privados ni archivos `.env` en Git.

Para publicar la versión actual del frontend:

```powershell
cd C:\dev\SEIDP\frontend
npm run build
cd ..
npx wrangler deploy
```

En Cloudflare Builds usa la raíz del repositorio con:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

El `package.json` de la raíz administra `frontend/` como workspace, por lo que
Cloudflare encuentra el proyecto aunque el código de la web esté en esa carpeta.

El Studio editorial está disponible en
<https://salud-e-imagen-del-puerto.sanity.studio/>.
