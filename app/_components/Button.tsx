import React from "react";

// TypeScript optional — remove types if you’re using JS
interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary" | "tertiary";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = "primary",
    onClick,
    className = "",
    disabled = false,
    type = "button"
}) => {

    const baseStyle = "px-2 lg:px-4 py-2 rounded-4xl font-medium transition duration-200 cursor-pointer text-center";

    const variants = {
        primary: "bg-[#1ADB04] text-xs text-white hover:bg-[#7bb972] capitalize",
        secondary: "bg-white text-xs border border-[#1ADB04] text-[#1ADB04] hover:bg-[#eef8ec] shadow-[0px_4px_10px_0px_#1ADB0426] capitalize",
        tertiary: "text-[#1ADB04] hover:text-[#7bb972] bg-transparent capitalize"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
            {label}
        </button>
    );
};

export default Button;
