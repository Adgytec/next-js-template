import { createProxy } from "next-i18next/proxy";
import { defaultLanguage, supportedLanguageKeys } from "./i18n/languages";

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};

const i18nConfig = {
    supportedLngs: supportedLanguageKeys as unknown as string[],
    fallbackLng: defaultLanguage,
    localeInPath: true,
    defaultNS: "common/utils",
};

export default createProxy(i18nConfig);
