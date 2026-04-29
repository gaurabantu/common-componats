import React__default from 'react';

/**
 * Icon source: URL string, Next.js StaticImageData, Vite import, or inline React element.
 * Works in Next.js, Vite, Create React App, and other React setups.
 */
type IconSource = string | React__default.ReactNode | {
    src: string;
    width?: number;
    height?: number;
} | {
    default: string;
};
interface IconProps extends Omit<React__default.HTMLAttributes<HTMLSpanElement>, "color"> {
    /** Icon source: URL, import path, StaticImageData, Vite import, or inline SVG/React element */
    src: IconSource;
    alt?: string;
    color?: string;
    width?: number | string;
    height?: number | string;
    preserveColors?: boolean;
    decorative?: boolean;
}
declare const Icon: React__default.NamedExoticComponent<IconProps>;

export { IconSource as I, Icon as a, IconProps as b };
