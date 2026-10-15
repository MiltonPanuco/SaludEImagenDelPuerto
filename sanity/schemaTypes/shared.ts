import { defineArrayMember, defineField, defineType } from "sanity";

export const LANGUAGES = ["es", "en"] as const;

type LocalizedValue = Partial<Record<(typeof LANGUAGES)[number], string>>;

function hasBothLanguages(value: unknown) {
  const localized = value as LocalizedValue | undefined;
  return LANGUAGES.every((language) => localized?.[language]?.trim())
    ? true
    : "Completa las versiones en español e inglés.";
}

function hasMatchingLanguages(value: unknown) {
  const localized = value as LocalizedValue | undefined;
  const filled = LANGUAGES.filter((language) => localized?.[language]?.trim());
  return filled.length === 0 || filled.length === LANGUAGES.length
    ? true
    : "Completa ambos idiomas o deja ambos vacíos.";
}

const localizedFields = (type: "string" | "text", rows?: number) =>
  LANGUAGES.map((language) =>
    defineField({
      name: language,
      title: language === "es" ? "Español" : "English",
      type,
      ...(type === "text" ? { rows } : {}),
    }),
  );

export const sharedTypes = [
  defineType({
    name: "localizedString",
    title: "Texto bilingüe",
    type: "object",
    options: { columns: 2 },
    fields: localizedFields("string"),
    validation: (Rule) => Rule.required().custom(hasBothLanguages),
  }),
  defineType({
    name: "localizedText",
    title: "Texto largo bilingüe",
    type: "object",
    options: { columns: 2 },
    fields: localizedFields("text", 4),
    validation: (Rule) => Rule.required().custom(hasBothLanguages),
  }),
  defineType({
    name: "localizedOptionalString",
    title: "Texto bilingüe opcional",
    type: "object",
    options: { columns: 2 },
    fields: localizedFields("string"),
    validation: (Rule) => Rule.custom(hasMatchingLanguages),
  }),
  defineType({
    name: "localizedOptionalText",
    title: "Texto largo bilingüe opcional",
    type: "object",
    options: { columns: 2 },
    fields: localizedFields("text", 4),
    validation: (Rule) => Rule.custom(hasMatchingLanguages),
  }),
  defineType({
    name: "localizedImage",
    title: "Imagen por idioma",
    type: "object",
    options: { columns: 2 },
    fields: LANGUAGES.map((language) =>
      defineField({
        name: language,
        title: language === "es" ? "Imagen en español" : "Image in English",
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title:
              language === "es" ? "Texto alternativo" : "Alternative text",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
        ],
      }),
    ),
    description:
      "Puedes seleccionar el mismo asset en ambos idiomas; el texto alternativo sí se edita por idioma.",
  }),
  defineType({
    name: "linkValue",
    title: "Enlace",
    type: "string",
    description: "Ruta interna, ancla, teléfono, correo o URL completa.",
    validation: (Rule) =>
      Rule.required().custom((value) =>
        !value || /^(https?:\/\/|\/|tel:|mailto:|#)/.test(value)
          ? true
          : "Usa https://, tel:, mailto:, # o una ruta que comience con /.",
      ),
  }),
  defineType({
    name: "localizedAction",
    title: "Acción",
    type: "object",
    fields: [
      defineField({ name: "label", title: "Texto", type: "localizedString" }),
      defineField({ name: "href", title: "Enlace", type: "linkValue" }),
    ],
  }),
  defineType({
    name: "contentCard",
    title: "Tarjeta",
    type: "object",
    fields: [
      defineField({
        name: "key",
        title: "Identificador",
        type: "string",
        description: "Nombre interno estable; no se muestra en el sitio.",
        validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
      }),
      defineField({ name: "title", title: "Título", type: "localizedString" }),
      defineField({
        name: "description",
        title: "Descripción",
        type: "localizedOptionalText",
      }),
      defineField({ name: "image", title: "Imagen", type: "localizedImage" }),
      defineField({ name: "action", title: "Acción", type: "localizedAction" }),
    ],
    preview: {
      select: { title: "title.es", subtitle: "description.es", media: "image.es" },
    },
  }),
  defineType({
    name: "contentSection",
    title: "Sección",
    type: "object",
    fields: [
      defineField({
        name: "key",
        title: "Identificador",
        type: "string",
        description: "Debe coincidir con la sección visual del sitio.",
        validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
      }),
      defineField({
        name: "eyebrow",
        title: "Etiqueta",
        type: "localizedOptionalString",
      }),
      defineField({ name: "title", title: "Título", type: "localizedString" }),
      defineField({
        name: "description",
        title: "Descripción",
        type: "localizedOptionalText",
      }),
      defineField({ name: "image", title: "Imagen", type: "localizedImage" }),
      defineField({
        name: "items",
        title: "Tarjetas o elementos",
        type: "array",
        of: [defineArrayMember({ type: "contentCard" })],
      }),
      defineField({ name: "action", title: "Acción", type: "localizedAction" }),
    ],
    preview: {
      select: { title: "title.es", subtitle: "key", media: "image.es" },
    },
  }),
];
