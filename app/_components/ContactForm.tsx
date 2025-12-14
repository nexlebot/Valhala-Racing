"use client";
import React, { useState } from 'react';
import Button from './Button';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    return (
        <div className="flex justify-center font-roboto" style={{ fontFamily: "var(--font-roboto), sans-serif" }}>
            <div className="w-full max-w-[1000px] border border-[#19db043d] bg-white rounded-2xl shadow-sm lg:shadow-lg shadow-[#19db045e] p-4 lg:p-8">
                <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: '#1ADB04' }}>
                    Contact Us
                </h2>

                <p className="max-w-2xl text-gray-600 text-sm mb-6 leading-relaxed">
                    Get in contact with any enquiries on current horses, race days or information on owning a horse with Vahala Racing Stables.
                </p>

                <div className="space-y-4">
                    {/* Name Field */}
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            className="flex w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all peer"
                            onFocus={(e) => e.target.style.borderColor = '#1ADB04'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                            style={{ color: '#6b7280' }}
                        >
                            Name <span className="text-red-500">*</span>
                        </label>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all peer"
                            onFocus={(e) => e.target.style.borderColor = '#1ADB04'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                    </div>

                    {/* Phone Number Field */}
                    <div className="relative">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all peer"
                            onFocus={(e) => e.target.style.borderColor = '#1ADB04'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                        <label
                            htmlFor="phone"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                        >
                            Phone number <span className="text-red-500">*</span>
                        </label>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell us about your ownership goals: Are you interested in a yearling, a ready-to-race horse, or reviewing partnership costs?"
                            rows={4}
                            className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all resize-none peer"
                            onFocus={(e) => e.target.style.borderColor = '#1ADB04'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                        {/* <label
                            htmlFor="message"
                            className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                        >
                            Message <span className="text-red-500">*</span>
                        </label> */}
                    </div>

                    {/* Submit Button */}
                    <Button type="button" label='Send' variant="primary" onClick={handleSubmit} className="px-14! uppercase text-base!" />

                </div>
            </div>
        </div>
    );
};

export default ContactForm;