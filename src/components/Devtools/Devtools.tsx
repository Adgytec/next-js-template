"use client";

import { lazy, Suspense } from "react";

const TanstackQueryDevtools = lazy(
    () => import("../../integrations/tanstack-query/devtools")
);

export function Devtools() {
    if (process.env.NODE_ENV !== "development") {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <TanstackQueryDevtools />
        </Suspense>
    );
}
