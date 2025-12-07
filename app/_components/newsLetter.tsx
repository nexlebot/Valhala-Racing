"use client"
// NewsletterSubscribe.jsx
import React, { useState } from "react";
import Button from "./Button";

type Status = "success" | "error" | null;


export default function NewsletterSubscribe() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>(null); // <-- typed as union
    const [errorMsg, setErrorMsg] = useState("");

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
        <section className="max-w-5xl lg:mx-auto mx-6 pb-10 lg:pb-14">
            <div className="flex rounded-2xl border border-[#1ADB04] p-6 lg:p-8 bg-[#1ADB0405]">
                <div className="flex flex-col gap-5">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl lg:text-3xl font-semibold text-[#1ADB04] tracking-tight leading-tight">
                            Stay Updated on Our Runners
                        </h2>
                        <p className="text-sm lg:text-base mt-2  text-[#000000CC]">
                            Join our mailing list to get the latest race updates, results, and exclusive insights from the Valhalla Racing team.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-3"
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
                            className="text-sm lg:text-base flex-1 min-w-0 px-4 py-2 rounded-lg border border-[#1ADB04] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1ADB04]"
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
                            className="text-sm lg:text-base flex-1 min-w-0 px-4 py-2 rounded-lg border border-[#1ADB04] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1ADB04]"
                        />

                        <Button label="Subscribe Now" type="submit" variant="primary" className="px-10" />
                    </form>
                </div>

                {/* Feedback row */}
                <div className="mt-4">
                    {status === "success" && (
                        <p className="text-sm text-green-700">Thanks! You’re subscribed.</p>
                    )}
                    {status === "error" && (
                        <p className="text-sm text-red-600">{errorMsg}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
