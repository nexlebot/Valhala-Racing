import { ReactNode } from "react";
import { CurvedLine } from "../HorseProfile";
import SectionHeader from "../sectionHeader";

export type Column<T extends Record<string, unknown> = Record<string, unknown>> = {
    key: string;
    label: string;
    grow?: number;
    width?: string;
    align?: "left" | "right";
    render?: (value: unknown, row: T) => ReactNode;
};

type SectionHeaderProps = {
    title: string;
    subtitle?: string;
    subHeading?: string;
    buttonText?: string;
    buttonLink?: string;
    buttonVariant?: "primary" | "secondary";
};

type Props<T extends Record<string, unknown>> = {
    items: T[];
    header: SectionHeaderProps;
    columns: Column<T>[];
};


export default function RaceListView<T extends Record<string, unknown>>({
    items,
    header,
    columns,
}: Props<T>) {
    return (
        <section className="py-14">
            <SectionHeader {...header} />

            <div className="relative space-y-6">
                <CurvedLine className="-top-2 hidden lg:block" />

                {/* TABLE HEADER */}
                <div className="hidden lg:flex items-center gap-6 py-3 text-sm font-semibold  uppercase">
                    {columns.map((col) => (
                        <div
                            key={col.key}
                            className={`flex-1 flex items-center ${col.align === "right" ? "justify-end" : ""}`}

                        >
                            {col.label}
                        </div>
                    ))}

                </div>

                {/* DATA ROWS */}
                {items.map((it, idx) => (
                    <div
                        key={`${it.horseName}-${idx}`}
                        className="flex items-center gap-6 py-5"
                    >
                        {columns.map((col) => (
                            <div
                                key={col.key}
                                className={`flex-1 flex items-center gap-3 ${col.align === "right" ? "justify-end" : ""}`}
                            >
                                <span className="dot" />
                                <span className={col.key === "horseName" ? "font-medium" : ""}>
                                    <span>
                                        {col.render
                                            ? col.render(it[col.key], it)
                                            : String(it[col.key])}
                                    </span>

                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
