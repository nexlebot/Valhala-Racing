"use client"
// NewsletterSubscribe.jsx
import React, { useState } from "react";

type Status = "success" | "error" | null;

interface ButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary";
    className?: string;
}

// Simple Button component
function Button({ label, type = "button", variant = "primary", className = "" }: ButtonProps) {
    const baseStyles = "px-6 py-2 rounded-lg font-medium transition-colors";
    const variants: Record<"primary", string> = {
        primary: "bg-[#1ADB04] text-white hover:bg-[#17c003]",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {label}
        </button>
    );
}

export default function NewsletterSubscribe() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<Status>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const validateEmail = (value: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);
        setErrorMsg("");

        if (!name.trim()) {
            setStatus("error");
            setErrorMsg("Please enter your name.");
            return;
        }

        if (!validateEmail(email)) {
            setStatus("error");
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        setTimeout(() => {
            setStatus("success");
            setName("");
            setEmail("");
        }, 600);
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-6 pb-10 lg:pb-14">
            <div className="rounded-2xl border border-[#1ADB04] p-6 lg:p-8 bg-[#1ADB0405]">
                <div className="flex flex-col gap-5">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl lg:text-3xl font-semibold text-[#1ADB04] tracking-tight leading-tight">
                            Stay Updated on Our Runners
                        </h2>
                        <p className="text-sm lg:text-base mt-2 text-[#000000CC]">
                            Join our mailing list to get the latest race updates, results, and exclusive insights from the Valhalla Racing team.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col sm:flex-row items-stretch gap-3"
                        aria-label="Subscribe to newsletter"
                    >
                        <label htmlFor="newsletter-name" className="sr-only">
                            Name
                        </label>
                        <input
                            id="newsletter-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="text-sm  flex-1 min-w-0 px-4 py-2 rounded-lg border border-[#19db0471] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#19db046e] bg-white"
                        />

                        <label htmlFor="newsletter-email" className="sr-only">
                            Email
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="text-sm  flex-1 min-w-0 px-4 py-2 rounded-lg border border-[#19db0471] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#19db046e] bg-white"
                        />

                        <Button
                            label="Subscribe Now"
                            type="submit"
                            variant="primary"
                            className="px-10 sm:w-auto rounded-full! w-full"
                        />
                    </form>

                    {/* Feedback row */}
                    {status && (
                        <div className="mt-0">
                            {status === "success" && (
                                <p className="text-sm text-green-700">Thanks! You&apos;re subscribed.</p>
                            )}
                            {status === "error" && (
                                <p className="text-sm text-red-600">{errorMsg}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}