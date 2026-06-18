"use client";

import {
    Divider,
    IconButton,
    Menu,
    MenuItem,
    MenuPopover,
    MenuTrigger,
    SubmenuPopover,
} from "@adgytec/adgytec-web-ui-components";
import { Languages, Palette, SettingsIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SubmenuTrigger } from "react-aria-components";
import { useBoolean } from "usehooks-ts";
import { useTSettings } from "@/hooks/translations";
import {
    isValidLanguageKey,
    type SupportedLanguage,
    supportedLanguages,
} from "@/i18n/languages";
import { ThemeSelector } from "../ThemeSelector/ThemeSelector";

export const Settings = () => {
    const { t, i18n } = useTSettings();
    const router = useRouter();
    const pathname = usePathname();
    const {
        value: isThemeSelectorOpen,
        setTrue: openThemeSelector,
        toggle: onThemeSelectorChange,
    } = useBoolean();

    return (
        <>
            <MenuTrigger>
                <IconButton
                    icon={SettingsIcon}
                    color="standard"
                    tooltip={t("heading")}
                />

                <MenuPopover>
                    <Menu>
                        <ThemeMenuItem openThemeSelector={openThemeSelector} />

                        <Divider />

                        <SubmenuTrigger>
                            <LanguageMenuItem />

                            <SubmenuPopover>
                                <Menu
                                    items={supportedLanguages}
                                    selectionMode="single"
                                    shouldCloseOnSelect={false}
                                    disallowEmptySelection
                                    selectedKeys={new Set([i18n.language])}
                                    onSelectionChange={(keys) => {
                                        if (keys === "all" || keys.size > 1)
                                            return;

                                        const [langKeyCandidate] = keys;
                                        if (
                                            isValidLanguageKey(langKeyCandidate)
                                        ) {
                                            const segments =
                                                pathname.split("/");
                                            segments[1] = langKeyCandidate;
                                            const newPath = segments.join("/");
                                            router.push(newPath);
                                        }
                                    }}
                                >
                                    {({ key }) => (
                                        <SupportedLanguageMenuItem lang={key} />
                                    )}
                                </Menu>
                            </SubmenuPopover>
                        </SubmenuTrigger>
                    </Menu>
                </MenuPopover>
            </MenuTrigger>

            <ThemeSelector
                isOpen={isThemeSelectorOpen}
                onOpenChange={onThemeSelectorChange}
            />
        </>
    );
};

const ThemeMenuItem: React.FC<{ openThemeSelector: () => void }> = ({
    openThemeSelector,
}) => {
    const { t } = useTSettings();
    return (
        <MenuItem
            onAction={openThemeSelector}
            leadingIcon={Palette}
            label={t("theme.heading")}
        />
    );
};

const LanguageMenuItem = () => {
    const { t } = useTSettings();
    return <MenuItem leadingIcon={Languages} label={t("language.heading")} />;
};

const SupportedLanguageMenuItem: React.FC<{ lang: SupportedLanguage }> = ({
    lang,
}) => {
    const { t } = useTSettings();
    return <MenuItem id={lang} label={t(`language.selection.${lang}`)} />;
};
