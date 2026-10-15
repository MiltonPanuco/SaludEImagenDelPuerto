import { defineArrayMember, defineField, defineType } from "sanity";

const SERVICE_ICONS = [
  "HeartPulse",
  "Microscope",
  "ScanLine",
  "Stethoscope",
  "Syringe",
  "TestTube2",
  "Utensils",
] as const;

export const serviceType = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "details", title: "Detalle" },
    { name: "publication", title: "Publicación" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Ruta",
      type: "slug",
      group: "publication",
      options: { source: "title.es", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
      group: "publication",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Mostrar públicamente",
      type: "boolean",
      initialValue: true,
      group: "publication",
    }),
    defineField({ name: "title", title: "Nombre", type: "localizedString", group: "content" }),
    defineField({
      name: "summary",
      title: "Resumen",
      type: "localizedText",
      group: "content",
    }),
    defineField({
      name: "introduction",
      title: "Introducción",
      type: "localizedText",
      group: "content",
    }),
    defineField({ name: "image", title: "Imagen", type: "localizedImage", group: "content" }),
    defineField({
      name: "icon",
      title: "Icono",
      type: "string",
      group: "content",
      options: {
        list: SERVICE_ICONS.map((value) => ({ title: value, value })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Indicaciones principales",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "catalogTitle",
      title: "Título del catálogo",
      type: "localizedString",
      group: "details",
    }),
    defineField({
      name: "catalog",
      title: "Estudios u opciones",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "process",
      title: "Proceso de atención",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Paso", type: "localizedString" }),
            defineField({
              name: "description",
              title: "Descripción",
              type: "localizedText",
            }),
          ],
          preview: { select: { title: "title.es", subtitle: "description.es" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    { title: "Orden editorial", name: "editorial", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title.es", subtitle: "summary.es", media: "image.es", active: "active" },
    prepare: ({ title, subtitle, media, active }) => ({
      title: title || "Servicio sin nombre",
      subtitle: `${active ? "Visible" : "Oculto"} · ${subtitle || ""}`,
      media,
    }),
  },
});
