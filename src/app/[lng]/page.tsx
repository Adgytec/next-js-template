"use client";

import { LinkButton } from "@/components/Link";
import { Scaffold, ScaffoldContent } from "@/components/Scaffold";
import { Settings } from "@/components/Settings";

export default function Home() {
    return (
        <Scaffold isNavigationDocked>
            <ScaffoldContent
                style={{
                    display: "flex",
                    gap: "var(--md-sys-layout-space-32)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Index
                <LinkButton to="/home" color="elevated">
                    home
                </LinkButton>
                <Settings />
            </ScaffoldContent>
        </Scaffold>
    );
}
