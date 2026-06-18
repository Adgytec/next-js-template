"use client";

import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { I18nProvider } from "next-i18next/client";
import type { ReactNode } from "react";
import { currency, datetime, fileSize, number } from "@/i18n/formatters";
import { defaultLanguage, supportedLanguageKeys } from "@/i18n/languages";
import { getEnvVar } from "@/utils/env/env";

const formattersPlugin = {
    type: "3rdParty" as const,
    // biome-ignore lint/suspicious/noExplicitAny: i18n instance type cast
    init(inst: any) {
        inst.services.formatter?.add("number", number);
        inst.services.formatter?.add("currency", currency);
        inst.services.formatter?.add("datetime", datetime);
        inst.services.formatter?.add("filesize", fileSize);
    },
};

export function NextI18nProvider({
    children,
    language,
}: {
    children: ReactNode;
    language: string;
}) {
    const loadPath = getEnvVar("NEXT_PUBLIC_TRANSLATION_CDN");

    return (
        <I18nProvider
            language={language}
            defaultNS="common/utils"
            // biome-ignore lint/suspicious/noExplicitAny: supportedLngs type cast
            supportedLngs={supportedLanguageKeys as any}
            fallbackLng={defaultLanguage}
            use={[Backend, LanguageDetector, formattersPlugin]}
            i18nextOptions={{
                backend: {
                    loadPath: loadPath,
                    crossDomain: true,
                },
                interpolation: {
                    escapeValue: false,
                },
            }}
        >
            {children}
        </I18nProvider>
    );
}
