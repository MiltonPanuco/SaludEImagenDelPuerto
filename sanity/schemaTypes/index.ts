import { pageDocumentTypes } from "./pages";
import { serviceType } from "./service";
import { sharedTypes } from "./shared";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes = [
  ...sharedTypes,
  ...pageDocumentTypes,
  serviceType,
  siteSettingsType,
];
