"use client";

import {
    SnackbarRegion,
    ThemeProvider,
} from "@adgytec/adgytec-web-ui-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode, Suspense, useState } from "react";
import { I18nProvider as ReactAriaI18nProvider } from "react-aria-components";
import { defaultLanguage } from "@/i18n/languages";
import { Devtools } from "../Devtools/Devtools";

export const ApplicationProvider: React.FC<{
    children?: ReactNode;
    language?: string;
}> = ({ children, language = defaultLanguage }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SnackbarRegion>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={null}>
                    <ReactAriaI18nProvider locale={language}>
                        <ThemeProvider>
                            {children}
                            <Devtools />
                        </ThemeProvider>
                    </ReactAriaI18nProvider>
                </Suspense>
            </QueryClientProvider>
        </SnackbarRegion>
    );
};
