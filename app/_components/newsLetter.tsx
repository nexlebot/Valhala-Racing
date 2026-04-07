"use client"
import React, { useState, useEffect } from "react";

type Status = "success" | "error" | null;

interface ButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary";
    className?: string;
}

function Button({ label, type = "button", variant = "primary", className = "" }: ButtonProps) {
    const baseStyles = "px-6 py-2 rounded-lg font-medium transition-colors";
    const variants: Record<"primary", string> = {
        primary: "bg-[#1ADB04] text-white hover:bg-[#17c003]",
    };
    return (
        <button type={type} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {label}
        </button>
    );
}

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
    useEffect(() => {
        const t = setTimeout(onClose, 4000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl px-5 py-4 shadow-lg text-white text-sm max-w-sm animate-fade-in ${
            type === "success" ? "bg-[#1ADB04]" : "bg-red-500"
        }`}>
            <span className="flex-1">
                {type === "success" ? (
                    <>
                        <p className="font-semibold">Thank you for subscribing! 🎉</p>
                        <p className="mt-0.5 opacity-90">Your information has been received. We&apos;ll keep you updated on our runners.</p>
                    </>
                ) : message}
            </span>
            <button onClick={onClose} className="opacity-80 hover:opacity-100 text-lg leading-none mt-0.5">✕</button>
        </div>
    );
}

export default function NewsletterSubscribe() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<Status>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);
        setErrorMsg("");

        if (!name.trim()) {
            setToast({ message: "Please enter your name.", type: "error" });
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setToast({ message: "Please enter a valid email address.", type: "error" });
            return;
        }

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setName("");
                setEmail("");
                setToast({ message: "", type: "success" });
            } else {
                setToast({ message: data.error ?? 'Something went wrong.', type: "error" });
            }
        } catch {
            setToast({ message: 'Something went wrong. Please try again.', type: "error" });
        }
    };

    return (
        <>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <section className="w-full max-w-5xl mx-auto px-6 pb-10 lg:pb-14">
                <div className="rounded-2xl border border-[#1ADB04] p-6 lg:p-8 bg-[#1ADB0405]">
                    <div className="flex flex-col gap-5">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl lg:text-3xl font-semibold text-[#1ADB04] tracking-tight leading-tight">
                                Stay Updated on Our Runners
                            </h2>
                            <p className="text-sm lg:text-base mt-2 text-[#000000CC]">
                                Join our mailing list to get the latest race updates, results, and exclusive insights from the Vahala Racing team.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col sm:flex-row items-stretch gap-3"
                            aria-label="Subscribe to newsletter"
                        >
                            <label htmlFor="newsletter-name" className="sr-only">Name</label>
                            <input
                                id="newsletter-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="text-sm flex-1 min-w-0 px-4 py-2 rounded-lg border border-[#19db0471] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#19db046e] bg-white"
                            />
                            <label htmlFor="newsletter-email" className="sr-only">Email</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="text-sm flex-1 min-w-0 px-4 py-2 rounded-lg border border-[#19db0471] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#19db046e] bg-white"
                            />
                            <Button label="Subscribe Now" type="submit" variant="primary" className="px-10 sm:w-auto rounded-full! w-full" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}