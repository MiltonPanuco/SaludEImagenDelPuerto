import { CogIcon } from "@sanity/icons/Cog";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { HomeIcon } from "@sanity/icons/Home";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { LockIcon } from "@sanity/icons/Lock";
import { MasterDetailIcon } from "@sanity/icons/MasterDetail";
import { PinIcon } from "@sanity/icons/Pin";
import { ProjectsIcon } from "@sanity/icons/Projects";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import type {
  ListItemBuilder,
  StructureBuilder,
  StructureResolver,
} from "sanity/structure";
import { pageDefinitions, type PageType } from "./schemaTypes/pages";

const PAGE_ICONS = {
  homePage: HomeIcon,
  aboutPage: InfoOutlineIcon,
  servicesPage: ProjectsIcon,
  preventionPage: SparklesIcon,
  contactPage: PinIcon,
  privacyPage: LockIcon,
  termsPage: DocumentsIcon,
};

export const SINGLETON_TYPES: string[] = [
  ...pageDefinitions.map(({ type }) => type),
  "siteSettings",
];

function pageItem(S: StructureBuilder, type: PageType): ListItemBuilder {
  const page = pageDefinitions.find((definition) => definition.type === type)!;
  return S.listItem()
    .title(page.title)
    .icon(PAGE_ICONS[type])
    .child(S.document().schemaType(type).documentId(page.id).title(page.title));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("SEIDP · Contenido")
    .items([
      pageItem(S, "homePage"),
      S.listItem()
        .title("Páginas")
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title("Páginas")
            .items([
              pageItem(S, "aboutPage"),
              pageItem(S, "servicesPage"),
              pageItem(S, "preventionPage"),
              pageItem(S, "contactPage"),
            ]),
        ),
      S.documentTypeListItem("service")
        .title("Servicios médicos")
        .icon(ProjectsIcon),
      S.listItem()
        .title("Legal")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Legal")
            .items([pageItem(S, "privacyPage"), pageItem(S, "termsPage")]),
        ),
      S.listItem()
        .title("Configuración")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("site-settings")
            .title("Ajustes generales"),
        ),
    ]);
