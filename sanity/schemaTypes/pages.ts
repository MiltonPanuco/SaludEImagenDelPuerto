import { defineArrayMember, defineField, defineType } from "sanity";

export const pageDefinitions = [
  {
    type: "homePage",
    id: "page-home",
    title: "Inicio",
    sections: ["introduccion", "servicios", "proceso", "cierre"],
  },
  {
    type: "aboutPage",
    id: "page-about",
    title: "Nosotros",
    sections: ["historia", "equipo", "mision-vision", "valores"],
  },
  {
    type: "servicesPage",
    id: "page-services",
    title: "Servicios",
    sections: ["categorias", "servicios-destacados", "orientacion"],
  },
  {
    type: "preventionPage",
    id: "page-prevention",
    title: "Prevención",
    sections: ["opciones", "orientacion", "beneficios", "aviso"],
  },
  {
    type: "contactPage",
    id: "page-contact",
    title: "Contacto",
    sections: ["canales", "ubicacion", "preguntas", "horarios"],
  },
  {
    type: "privacyPage",
    id: "page-privacy",
    title: "Aviso de privacidad",
    sections: ["contenido", "nota-importante"],
  },
  {
    type: "termsPage",
    id: "page-terms",
    title: "Términos y condiciones",
    sections: ["contenido", "nota-importante"],
  },
] as const;

export type PageType = (typeof pageDefinitions)[number]["type"];

export const pageDocumentTypes = pageDefinitions.map((page) =>
  defineType({
    name: page.type,
    title: `Página · ${page.title}`,
    type: "document",
    groups: [
      { name: "content", title: "Contenido", default: true },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({
        name: "seo",
        title: "Buscadores y redes",
        type: "object",
        group: "seo",
        fields: [
          defineField({ name: "title", title: "Título", type: "localizedString" }),
          defineField({
            name: "description",
            title: "Descripción",
            type: "localizedText",
          }),
          defineField({ name: "image", title: "Imagen social", type: "localizedImage" }),
        ],
      }),
      defineField({
        name: "hero",
        title: "Portada",
        type: "object",
        group: "content",
        options: { collapsible: true, collapsed: false },
        fields: [
          defineField({
            name: "eyebrow",
            title: "Etiqueta",
            type: "localizedOptionalString",
          }),
          defineField({ name: "title", title: "Título", type: "localizedString" }),
          defineField({
            name: "highlight",
            title: "Texto destacado",
            type: "localizedOptionalString",
          }),
          defineField({
            name: "description",
            title: "Descripción",
            type: "localizedOptionalText",
          }),
          defineField({ name: "image", title: "Imagen", type: "localizedImage" }),
          defineField({ name: "action", title: "Acción", type: "localizedAction" }),
        ],
      }),
      defineField({
        name: "sections",
        title: "Secciones",
        description:
          "Conserva los identificadores existentes: conectan el contenido con el diseño de la web.",
        type: "array",
        group: "content",
        of: [defineArrayMember({ type: "contentSection" })],
        validation: (Rule) =>
          Rule.required().custom((sections) => {
            const keys = (sections as Array<{ key?: string }> | undefined)?.map(
              (section) => section.key,
            );
            return keys && new Set(keys).size === keys.length
              ? true
              : "Cada sección debe tener un identificador único.";
          }),
      }),
    ],
    initialValue: {
      sections: page.sections.map((key) => ({
        _key: key,
        _type: "contentSection",
        key,
      })),
    },
    preview: {
      prepare: () => ({
        title: page.title,
        subtitle: "Página única · ES / EN",
      }),
    },
  }),
);
