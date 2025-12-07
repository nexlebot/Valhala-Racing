import React from "react";
import Button from "./Button";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonVariant?: "primary" | "secondary" | "tertiary";
    onButtonClick?: () => void;
    className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    buttonText,
    buttonVariant = "primary",
    onButtonClick,
    className = "",
}) => {
    return (
        <div className={`flex justify-between items-center mb-12 ${className}`}>
            <div>
                <h1 className="text-xl lg:text-4xl font-semibold mb-1 text-[#1ADB04]">{title}</h1>
                {subtitle && <p className="text-sm lg:text-base">{subtitle}</p>}
            </div>

            {buttonText && (
                <Button
                    label={buttonText}
                    variant={buttonVariant}
                    onClick={onButtonClick}
                />
            )}
        </div>
    );
};

export default SectionHeader;
