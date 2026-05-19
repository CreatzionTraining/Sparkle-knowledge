'use client';

import { useState, useEffect } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { courseOptions, getCourseLabel } from '@/lib/courseOptions';

export default function RegistrationPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const selectedCourseLabel = selectedCourse ? getCourseLabel(selectedCourse) : '';

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
                    interestedIn: selectedCourseLabel,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Store registration data in localStorage
                localStorage.setItem('user-registered', 'true');
                localStorage.setItem('user-name', fullName);
                localStorage.setItem('user-email', email);
                localStorage.setItem('user-phone', `${countryCode}${phoneNumber}`);
                localStorage.setItem('user-interested-in', selectedCourseLabel);

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

    const handleCourseSelect = (value: string) => {
        setSelectedCourse(value);
        setIsCourseDropdownOpen(false);
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 pointer-events-none">
                <div
                    className={`bg-white rounded-2xl shadow-2xl w-full max-w-[400px] max-h-[calc(100svh-1.5rem)] overflow-visible px-5 py-5 md:px-7 md:py-6 pointer-events-auto relative transition-all duration-500 ${isClosing ? 'opacity-0 scale-95' : 'animate-slideUp'}`}
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
                    <div className="mb-4 text-center pr-5">
                        <h2 className="text-[28px] md:text-[34px] font-bold bg-gradient-to-r from-blue-600 via-red-500 to-red-600 bg-clip-text text-transparent leading-[1.12] tracking-normal" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                            Empower Your Academic Future
                        </h2>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Full Name Field */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-[13px] font-semibold text-gray-700 mb-1.5"
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
                                autoComplete="name"
                                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 caret-black text-sm"
                            />
                        </div>

                        {/* Mobile Number Field */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-[13px] font-semibold text-gray-700 mb-1.5"
                            >
                                Mobile Number
                            </label>
                            <div className="flex gap-2">
                                {/* Country Code Dropdown */}
                                <div className="relative">
                                    <select
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        className="h-11 w-[104px] pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 font-semibold cursor-pointer appearance-none hover:bg-white text-sm"
                                    >
                                        <option value="+91">🇮🇳 +91</option>
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+44">🇬🇧 +44</option>
                                        <option value="+61">🇦🇺 +61</option>
                                        <option value="+971">🇦🇪 +971</option>
                                        <option value="+33">🇫🇷 +33</option>
                                        <option value="+49">🇩🇪 +49</option>
                                        <option value="+81">🇯🇵 +81</option>
                                        <option value="+86">🇨🇳 +86</option>
                                        <option value="+65">🇸🇬 +65</option>
                                        <option value="+60">🇲🇾 +60</option>
                                        <option value="+1">🇨🇦 +1</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>

                                {/* Phone Input */}
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                    placeholder="Phone No."
                                    required
                                    maxLength={15}
                                    autoComplete="tel"
                                    className="h-11 min-w-0 flex-1 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium text-sm"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[13px] font-semibold text-gray-700 mb-1.5"
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
                                autoComplete="email"
                                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 caret-black text-sm"
                            />
                        </div>

                        {/* Course Dropdown */}
                        <div>
                            <label
                                id="course-label"
                                className="block text-[13px] font-semibold text-gray-700 mb-1.5"
                            >
                                Interested In
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-haspopup="listbox"
                                    aria-expanded={isCourseDropdownOpen}
                                    aria-label={selectedCourseLabel || 'Select a course'}
                                    onClick={() => setIsCourseDropdownOpen((isOpen) => !isOpen)}
                                    className={`w-full h-11 px-4 bg-gray-50 border rounded-lg outline-none transition-all text-left flex items-center justify-between gap-3 hover:bg-white ${isCourseDropdownOpen
                                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <span className={`text-sm font-medium truncate ${selectedCourseLabel ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {selectedCourseLabel || 'Select a course'}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 shrink-0 text-gray-500 transition-transform duration-300 ${isCourseDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                                </button>

                                {isCourseDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-[55] bg-transparent"
                                            onClick={() => setIsCourseDropdownOpen(false)}
                                        />
                                        <div
                                            role="listbox"
                                            aria-labelledby="course-label"
                                            className="absolute left-0 right-0 bottom-full z-[60] mb-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15"
                                        >
                                            <div className="py-1">
                                                {courseOptions.map((option) => {
                                                    const isSelected = selectedCourse === option.value;

                                                    return (
                                                        <button
                                                            key={option.value}
                                                            type="button"
                                                            role="option"
                                                            aria-selected={isSelected}
                                                            onClick={() => handleCourseSelect(option.value)}
                                                            className={`w-full px-4 py-2.5 text-left flex items-center justify-between gap-3 text-sm transition-colors ${isSelected
                                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                                : 'text-gray-700 font-medium hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            <span>{option.label}</span>
                                                            {isSelected && <Check className="w-4 h-4 shrink-0 text-blue-600" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || !selectedCourseLabel}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold px-6 rounded-lg hover:from-blue-700 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl tracking-wide"
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
