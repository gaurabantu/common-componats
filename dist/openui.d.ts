import * as _openuidev_react_lang from '@openuidev/react-lang';
export { ActionEvent, Renderer, RendererProps } from '@openuidev/react-lang';
import { z } from 'zod/v4';

declare const StatCard: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    unit: z.ZodOptional<z.ZodString>;
    change: z.ZodOptional<z.ZodString>;
    trend: z.ZodOptional<z.ZodEnum<{
        up: "up";
        down: "down";
        neutral: "neutral";
    }>>;
    changeLabel: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
declare const DataTable: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    caption: z.ZodString;
    columns: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        header: z.ZodString;
        align: z.ZodOptional<z.ZodEnum<{
            left: "left";
            right: "right";
            center: "center";
        }>>;
    }, z.core.$strip>>;
    rows: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodNull]>>>;
}, z.core.$strip>>;
declare const BarChart: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    data: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodNull]>>>;
    xKey: z.ZodString;
    series: z.ZodArray<z.ZodObject<{
        dataKey: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    horizontal: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>>;
declare const LineChart: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    data: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodNull]>>>;
    xKey: z.ZodString;
    series: z.ZodArray<z.ZodObject<{
        dataKey: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>>;
declare const PieChart: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodNumber;
    }, z.core.$strip>>;
    donut: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>>;
declare const Alert: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    variant: z.ZodEnum<{
        success: "success";
        danger: "danger";
        warning: "warning";
        info: "info";
        neutral: "neutral";
    }>;
    message: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
declare const Badge: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    text: z.ZodString;
    variant: z.ZodOptional<z.ZodEnum<{
        primary: "primary";
        success: "success";
        danger: "danger";
        warning: "warning";
        info: "info";
        neutral: "neutral";
    }>>;
}, z.core.$strip>>;
declare const ActionButton: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    label: z.ZodString;
    message: z.ZodString;
    variant: z.ZodOptional<z.ZodEnum<{
        primary: "primary";
        secondary: "secondary";
        outlineSecondary: "outlineSecondary";
    }>>;
}, z.core.$strip>>;
declare const Card: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    children: z.ZodArray<z.ZodUnion<[z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, ...z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>[]]>>;
    title: z.ZodOptional<z.ZodString>;
    subtitle: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
declare const Grid: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    columns: z.ZodNumber;
    children: z.ZodArray<z.ZodUnion<[z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, ...z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>[]]>>;
}, z.core.$strip>>;
declare const Stack: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
    children: z.ZodArray<z.ZodUnion<[z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, ...z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>[]]>>;
}, z.core.$strip>>;
declare const openuiComponents: {
    Stack: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
        children: z.ZodArray<z.ZodUnion<[z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, ...z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>[]]>>;
    }, z.core.$strip>>;
    Grid: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
        columns: z.ZodNumber;
        children: z.ZodArray<z.ZodUnion<[z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, ...z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>[]]>>;
    }, z.core.$strip>>;
    Card: _openuidev_react_lang.DefinedComponent<z.ZodObject<{
        children: z.ZodArray<z.ZodUnion<[z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>, ...z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>[]]>>;
        title: z.ZodOptional<z.ZodString>;
        subtitle: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
};

declare const designSystemLibrary: Required<_openuidev_react_lang.Library<never>>;

export { ActionButton, Alert, Badge, BarChart, Card, DataTable, Grid, LineChart, PieChart, Stack, StatCard, designSystemLibrary, openuiComponents };
