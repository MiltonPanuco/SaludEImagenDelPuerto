import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Ajustes generales",
  type: "document",
  groups: [
    { name: "navigation", title: "Navegación", default: true },
    { name: "contact", title: "Contacto" },
    { name: "hours", title: "Horarios" },
    { name: "footer", title: "Pie de página" },
  ],
  fields: [
    defineField({
      name: "navigation",
      title: "Navegación principal",
      type: "object",
      group: "navigation",
      fields: [
        defineField({ name: "home", title: "Inicio", type: "localizedString" }),
        defineField({ name: "about", title: "Nosotros", type: "localizedString" }),
        defineField({ name: "services", title: "Servicios", type: "localizedString" }),
        defineField({ name: "prevention", title: "Prevención", type: "localizedString" }),
        defineField({ name: "contact", title: "Contacto", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Datos de contacto",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "address", title: "Dirección", type: "localizedText" }),
        defineField({ name: "appointmentPhone", title: "Teléfono de citas", type: "string" }),
        defineField({ name: "urgencyPhone", title: "Teléfono de urgencias", type: "string" }),
        defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
        defineField({
          name: "whatsappMessage",
          title: "Mensaje inicial de WhatsApp",
          type: "localizedText",
        }),
        defineField({ name: "mapUrl", title: "Enlace de mapa", type: "url" }),
        defineField({
          name: "socialLinks",
          title: "Redes sociales",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", title: "Red", type: "string" }),
                defineField({ name: "url", title: "Enlace", type: "url" }),
              ],
              preview: { select: { title: "name", subtitle: "url" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Horarios",
      type: "array",
      group: "hours",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "days", title: "Días", type: "localizedString" }),
            defineField({
              name: "schedule",
              title: "Horario",
              type: "string",
              description: "Ejemplo: 07:00–19:00",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "days.es", subtitle: "schedule" } },
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Pie de página",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "description", title: "Descripción", type: "localizedText" }),
        defineField({ name: "copyright", title: "Copyright", type: "localizedString" }),
        defineField({ name: "privacyLabel", title: "Aviso de privacidad", type: "localizedString" }),
        defineField({ name: "termsLabel", title: "Términos", type: "localizedString" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Ajustes generales", subtitle: "Sitio completo · ES / EN" }),
  },
});
