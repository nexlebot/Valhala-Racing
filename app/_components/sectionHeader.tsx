import React from "react";
import Button from "./Button";
import Link from "next/link";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    buttonVariant?: "primary" | "secondary" | "tertiary";
    onButtonClick?: () => void;
    className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    buttonText,
    buttonLink,
    buttonVariant = "primary",
    onButtonClick,
    className = "",
}) => {
    return (
        <div className={` mb-2 lg:mb-12 ${className}`}>
            <div className="flex justify-between items-start lg:items-center ">

                <div className="max-w-[70%] mb-2 lg:mb-0">
                    <h1 className="text-2xl lg:text-4xl font-semibold mb-1 text-primary">{title}</h1>
                </div>

                {buttonText && buttonLink ? (
                    <Link href={buttonLink}>
                        <Button
                            label={buttonText}
                            variant={buttonVariant}
                        />
                    </Link>
                ) : (
                    buttonText && (
                        <Button
                            label={buttonText}
                            variant={buttonVariant}
                            onClick={onButtonClick}
                        />
                    )
                )}
            </div>
            {subtitle && <p className="my-2 lg:mt-0 text-sm lg:text-base">{subtitle}</p>}
        </div>
    );
};

export default SectionHeader;
