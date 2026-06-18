import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { getEnvVar } from "@/utils/env/env";
import { currency, datetime, fileSize, number } from "./formatters";
import { defaultLanguage, supportedLanguageKeys } from "./languages";

const loadPath = getEnvVar("NEXT_PUBLIC_TRANSLATION_CDN");

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        load: "languageOnly",
        fallbackLng: defaultLanguage,
        supportedLngs: supportedLanguageKeys,
        defaultNS: "common/utils",
        fallbackNS: "common/utils",
        backend: {
            loadPath: loadPath,
            crossDomain: true,
        },
        debug: process.env.NODE_ENV === "development",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

i18n.services.formatter?.add("number", number);
i18n.services.formatter?.add("currency", currency);
i18n.services.formatter?.add("datetime", datetime);
i18n.services.formatter?.add("filesize", fileSize);

export default i18n;
