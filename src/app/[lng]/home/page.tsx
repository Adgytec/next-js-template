"use client";

import { LinkButton } from "@/components/Link";
import { Scaffold, ScaffoldContent } from "@/components/Scaffold";
import { Settings } from "@/components/Settings";

export default function HomeRoute() {
    return (
        <Scaffold isNavigationDocked variant="decorative">
            <ScaffoldContent
                style={{
                    display: "flex",
                    gap: "var(--md-sys-layout-space-32)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Home
                <LinkButton to="/">Index</LinkButton>
                <Settings />
            </ScaffoldContent>
        </Scaffold>
    );
}
