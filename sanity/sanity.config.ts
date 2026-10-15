import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { BrandIcon } from "./components/BrandIcon";
import { schemaTypes } from "./schemaTypes";
import { SINGLETON_TYPES, structure } from "./structure";

export default defineConfig({
  name: "seidp",
  title: "SEIDP · Gestor de contenido",
  icon: BrandIcon,
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID || "g21lyvbs",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: {
    actions: (previous, context) =>
      SINGLETON_TYPES.includes(context.schemaType)
        ? previous.filter(
            ({ action }) => action !== "delete" && action !== "duplicate",
          )
        : previous,
    newDocumentOptions: (previous) =>
      previous.filter(
        ({ templateId }) => !SINGLETON_TYPES.includes(templateId),
      ),
  },
});
