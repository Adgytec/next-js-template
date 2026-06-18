import type { Metadata } from "next";
import "../../styles/fonts.css";
import "../../styles/core/theme/base/base.css";
import "../../styles/core/core.css";
import "../../styles/main.css";
import { ApplicationProvider } from "../../components/ApplicationProvider";
import { NextI18nProvider } from "../../components/NextI18nProvider";

export const metadata: Metadata = {
    title: "Next.js App",
    description:
        "Next.js template configured with React Aria and Material 3 design tokens",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lng: string }>;
}>) {
    const { lng } = await params;

    return (
        <html lang={lng}>
            <body>
                <NextI18nProvider language={lng}>
                    <ApplicationProvider language={lng}>
                        {children}
                    </ApplicationProvider>
                </NextI18nProvider>
            </body>
        </html>
    );
}
