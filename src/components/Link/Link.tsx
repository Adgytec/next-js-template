"use client";

import {
    LinkButton as M3LinkButton,
    LinkIconButton as M3LinkIconButton,
    NavigationLink as M3NavigationLink,
    MenuItem,
    SelectItem,
} from "@adgytec/adgytec-web-ui-components";
import NextLink from "next/link";
import React from "react";
import { Link as AriaLink, ListBoxItem } from "react-aria-components";

// biome-ignore lint/suspicious/noExplicitAny: generic component type
function createLink<T extends React.ComponentType<any>>(Component: T) {
    type ComponentPropsType = React.ComponentPropsWithoutRef<T> & {
        to?: string;
    };
    // biome-ignore lint/suspicious/noExplicitAny: ref type
    const Wrapped = React.forwardRef<any, ComponentPropsType>(
        // biome-ignore lint/suspicious/noExplicitAny: component properties
        ({ href, to, render, ...props }: any, ref) => {
            const targetHref = href || to;
            return (
                <Component
                    ref={ref}
                    href={targetHref}
                    // biome-ignore lint/suspicious/noExplicitAny: render prop callback
                    render={(renderProps: any) => {
                        if (render) {
                            return render(renderProps);
                        }
                        if (renderProps.href) {
                            const isExternal =
                                renderProps.href.startsWith("http") ||
                                renderProps.target === "_blank";
                            if (!isExternal) {
                                return <NextLink {...renderProps} />;
                            }
                            return <a {...renderProps} />;
                        }
                        const isItem =
                            Component === MenuItem ||
                            Component === SelectItem ||
                            Component === ListBoxItem;
                        if (isItem) {
                            return <div {...renderProps} />;
                        }
                        return <span {...renderProps} />;
                    }}
                    {...props}
                />
            );
        }
    );
    Wrapped.displayName = `Link(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
}

export const Link = createLink(AriaLink);
export const MenuItemLink = createLink(MenuItem);
export const SelectItemLink = createLink(SelectItem);
export const ListBoxItemLink = createLink(ListBoxItem);
export const NavigationLink = createLink(M3NavigationLink);
export const LinkButton = createLink(M3LinkButton);
export const LinkIconButton = createLink(M3LinkIconButton);
