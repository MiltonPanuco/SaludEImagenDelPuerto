# Sanity Studio

Panel de contenido bilingüe de Salud e Imagen del Puerto. Está conectado al
proyecto `g21lyvbs` y al dataset `production`.

Studio publicado: <https://salud-e-imagen-del-puerto.sanity.studio/>

## Configuración

Copia `.env.example` como `.env.local` y completa:

```dotenv
SANITY_STUDIO_PROJECT_ID=g21lyvbs
SANITY_STUDIO_DATASET=production
```

El Studio usa la sesión de Sanity de cada usuario. No necesita tokens privados
guardados en el repositorio.

## Comandos

```powershell
npm install
npm run dev
npm run typecheck
npm test
npm run build
npm run deploy
```

El despliegue usa el `appId` configurado en `sanity.cli.ts`, por lo que las
siguientes actualizaciones conservan la misma dirección del Studio.

`npm run dev` abre el Studio en `http://localhost:3333`.

## Contenido

- Las páginas y los ajustes generales son documentos únicos.
- Los servicios son una colección ordenada y pueden activarse u ocultarse.
- El contenido editorial y las imágenes admiten español e inglés.
- La web pública lee únicamente documentos publicados.

La carga inicial se genera con `npm run seed` y se importa con
`npm run import:content`. La importación usa IDs fijos y reemplaza documentos
con esos mismos IDs; úsala solo cuando quieras restaurar la información base.
