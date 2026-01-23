'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function RegistrationPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Check if user has already registered
        const hasRegistered = localStorage.getItem('user-registered');

        if (!hasRegistered) {
            // Show popup after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Call the registration API
            const response = await fetch('/api/register-popup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: fullName,
                    email: email,
                    phone: `${countryCode}${phoneNumber}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Store registration data in localStorage
                localStorage.setItem('user-registered', 'true');
                localStorage.setItem('user-name', fullName);
                localStorage.setItem('user-email', email);
                localStorage.setItem('user-phone', `${countryCode}${phoneNumber}`);

                // Show "Thank you" message
                setShowThankYou(true);

                // Wait 1 second to show "Thank you" message
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Trigger fade-out animation
                setIsClosing(true);

                // Wait for animation to complete (500ms)
                await new Promise(resolve => setTimeout(resolve, 500));

                // Close popup
                setIsVisible(false);
                setIsSubmitting(false);
                setShowThankYou(false);
                setIsClosing(false);
            } else {
                // Handle error
                console.error('Registration failed:', result.error);
                setIsSubmitting(false);
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting registration:', error);
            setIsSubmitting(false);
            alert('An error occurred. Please try again.');
        }
    };

    const handleClose = async () => {
        setIsClosing(true);
        // Wait for animation to complete (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsVisible(false);
        setIsClosing(false);
        // Mark as registered to prevent showing again
        localStorage.setItem('user-registered', 'true');
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'animate-fadeIn'}`}
                onClick={handleClose}
            />

            {/* Popup Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 pointer-events-auto relative transition-all duration-500 ${isClosing ? 'opacity-0 scale-95' : 'animate-slideUp'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent mb-3 leading-tight tracking-wide" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                            Empower Your Academic Future
                        </h2>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name Field */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Only allow letters and spaces
                                    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
                                    setFullName(filteredValue);
                                }}
                                placeholder="John Doe"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 caret-black"
                            />
                        </div>

                        {/* Mobile Number Field */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Mobile Number
                            </label>
                            <div className="flex gap-2">
                                {/* Country Code Dropdown */}
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white cursor-pointer"
                                >
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option>
                                    <option value="+971">+971</option>
                                </select>

                                {/* Phone Input */}
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                    placeholder="1234567890"
                                    required
                                    maxLength={10}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 caret-black"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john.doe@example.com"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 caret-black"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {showThankYou ? 'Thank you ✓' : (isSubmitting ? 'Processing...' : 'Take the First Step')}
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </>
    );
}
