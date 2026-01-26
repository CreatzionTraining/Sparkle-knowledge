'use client';

import React, { useState } from 'react';
import NewsTicker from './NewsTicker';

// Icon components (inline SVG)
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C7.589 2 4 5.589 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.589 16.411 2 12 2ZM12 12.5C10.619 12.5 9.5 11.381 9.5 10C9.5 8.619 10.619 7.5 12 7.5C13.381 7.5 14.5 8.619 14.5 10C14.5 11.381 13.381 12.5 12 12.5Z" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M16.57 22C14.2885 21.9961 12.0674 21.3789 10.09 20.2C8.17937 19.0558 6.50567 17.4871 5.23 15.63C3.65089 13.2372 2.89938 10.4285 3.06 7.57C3.09 6.27 4.15 5.24 5.45 5.24H8.22C9.07 5.24 9.8 5.86 9.94 6.7L10.23 8.65C10.37 9.57 9.92 10.46 9.15 10.96L8.03 11.69C9.01 13.62 10.63 15.24 12.57 16.22L13.29 15.11C13.79 14.34 14.67 13.88 15.6 14.03L17.55 14.32C18.39 14.45 19.01 15.19 19.01 16.03V18.82C19.01 20.21 17.86 21.3 16.57 22Z" />
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 13.065L4 6.511V6H20ZM4 18V9.044L11.386 15.098C11.5611 15.2413 11.7773 15.3187 12 15.3187C12.2227 15.3187 12.4389 15.2413 12.614 15.098L20 9.044L20.002 18H4Z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
    <path d="M13 7H11V13H17V11H13V7Z" />
  </svg>
);

const Send = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Handle keyboard navigation for country dropdown
  React.useEffect(() => {
    if (!isCountryDropdownOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        // Find first country starting with the pressed key
        const char = e.key.toLowerCase();
        const targetCountry = countryCodes.find(c => c.country.toLowerCase().startsWith(char));
        
        if (targetCountry) {
          const element = document.getElementById(`country-item-${targetCountry.code}`);
          if (element) {
            element.scrollIntoView({ block: 'nearest' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCountryDropdownOpen]);

  // Load form data from localStorage on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        // Invalid data, ignore
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  React.useEffect(() => {
    if (formData.fullName || formData.email || formData.phone || formData.message) {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const courseOptions = [
    { value: 'ielts', label: 'IELTS' },
    { value: 'toefl', label: 'TOEFL' },
    { value: 'pte', label: 'PTE' },
    { value: 'gre', label: 'GRE' },
    { value: 'gmat', label: 'GMAT' },
    { value: 'study-abroad', label: 'Study Abroad Counseling' },
    { value: 'language', label: 'Language Training' }
  ];

  const countryCodes = [
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+355', country: 'Albania', flag: '🇦🇱' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+376', country: 'Andorra', flag: '🇦🇩' },
    { code: '+244', country: 'Angola', flag: '🇦🇴' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+374', country: 'Armenia', flag: '🇦🇲' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+501', country: 'Belize', flag: '🇧🇿' },
    { code: '+229', country: 'Benin', flag: '🇧🇯' },
    { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
    { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
    { code: '+387', country: 'Bosnia', flag: '🇧🇦' },
    { code: '+267', country: 'Botswana', flag: '🇧🇼' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+673', country: 'Brunei', flag: '🇧🇳' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
    { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
    { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
    { code: '+235', country: 'Chad', flag: '🇹🇩' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+269', country: 'Comoros', flag: '🇰🇲' },
    { code: '+242', country: 'Congo', flag: '🇨🇬' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺' },
    { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
    { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: '+291', country: 'Eritrea', flag: '🇪🇷' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+679', country: 'Fiji', flag: '🇫🇯' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+220', country: 'Gambia', flag: '🇬🇲' },
    { code: '+995', country: 'Georgia', flag: '🇬🇪' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
    { code: '+224', country: 'Guinea', flag: '🇬🇳' },
    { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾' },
    { code: '+509', country: 'Haiti', flag: '🇭🇹' },
    { code: '+504', country: 'Honduras', flag: '🇭🇳' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
    { code: '+964', country: 'Iraq', flag: '🇮🇶' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+225', country: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+7', country: 'Kazakhstan', flag: '🇰🇿' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+856', country: 'Laos', flag: '🇱🇦' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
    { code: '+231', country: 'Liberia', flag: '🇱🇷' },
    { code: '+218', country: 'Libya', flag: '🇱🇾' },
    { code: '+423', country: 'Liechtenstein', flag: '🇱🇮' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+853', country: 'Macau', flag: '🇲🇴' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+222', country: 'Mauritania', flag: '🇲🇷' },
    { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+373', country: 'Moldova', flag: '🇲🇩' },
    { code: '+377', country: 'Monaco', flag: '🇲🇨' },
    { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
    { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
    { code: '+264', country: 'Namibia', flag: '🇳🇦' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
    { code: '+227', country: 'Niger', flag: '🇳🇪' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+970', country: 'Palestine', flag: '🇵🇸' },
    { code: '+507', country: 'Panama', flag: '🇵🇦' },
    { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬' },
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+221', country: 'Senegal', flag: '🇸🇳' },
    { code: '+381', country: 'Serbia', flag: '🇷🇸' },
    { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
    { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+252', country: 'Somalia', flag: '🇸🇴' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+211', country: 'South Sudan', flag: '🇸🇸' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+249', country: 'Sudan', flag: '🇸🇩' },
    { code: '+597', country: 'Suriname', flag: '🇸🇷' },
    { code: '+268', country: 'Eswatini', flag: '🇸🇿' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+963', country: 'Syria', flag: '🇸🇾' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+228', country: 'Togo', flag: '🇹🇬' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' },
    { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+967', country: 'Yemen', flag: '🇾🇪' },
    { code: '+260', country: 'Zambia', flag: '🇿🇲' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
  ];

  const handleCourseSelect = (value: string) => {
    setFormData({ ...formData, course: value });
    setIsDropdownOpen(false);
  };

  const handleCountryCodeSelect = (code: string) => {
    setCountryCode(code);
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Start loading animation
    setIsSubmitting(true);
    
    try {
      // Call the email API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: `${countryCode} ${formData.phone}`,
          interestedIn: formData.course ? courseOptions.find(opt => opt.value === formData.course)?.label : '',
          message: formData.message
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear localStorage first
        localStorage.removeItem('contactFormData');
        
        // Clear form immediately
        const emptyForm = {
          fullName: '',
          phone: '',
          email: '',
          course: '',
          message: ''
        };
        setFormData(emptyForm);
        setAcceptedTerms(false);
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Clear browser's POST history to prevent resubmission on refresh
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        // Auto-close modal after 5 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 5000);
      } else {
        // Handle error silently - just log it
        console.error('Failed to send email:', result.error);
        // Don't show alert - user might be refreshing
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Don't show alert - user might be refreshing
    } finally {
      // Stop loading
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate full name - only alphabets and spaces
    if (name === 'fullName') {
      const alphabetsOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({
        ...formData,
        [name]: alphabetsOnly
      });
    } else if (name === 'phone') {
      // Only allow numbers
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: numbersOnly
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* Ultra-Premium Background Pattern - Compact */}
      <div className="absolute inset-0 bg-white">
       {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwIDE1djEwTTE1IDIwaDEwIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2Utb3BhY2l0eT0iMC4yIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBmaWxsPSJub25lIi8+PC9zdmc+')]"></div> */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] rounded-full bg-[#1D4ED8] opacity-20 blur-[80px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[200px] w-[200px] rounded-full bg-[#E63946] opacity-10 blur-[80px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Compact */}
        <div className="text-center mb-10 max-w-4xl mx-auto">
          {/* Elite Label - New Design */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative group cursor-default">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-red-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600 uppercase">Get In Touch</span>
              </div>
            </div>
          </div>

          {/* Ultra-Premium Main Heading - Compact Size */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#1D4ED8] to-[#E63946] animate-gradient-x bg-[length:200%_auto]">Learning Journey</span>
            <span className="block sm:inline sm:ml-2 text-slate-800">With Sparkle</span>
          </h2>
          
          {/* Sophisticated Subtitle - Compact */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Experience world-class guidance. Visit us for a <span className="font-bold text-slate-900">free consultation</span> and see why we are the <span className="inline-block border-b-2 border-[#E63946] text-[#E63946] font-bold">#1 choice</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 order-2 lg:order-1 relative overflow-hidden">
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all text-base text-gray-900 placeholder:text-gray-400 bg-gray-50/50 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    {/* Country Code Dropdown Button - Inside Input */}
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-[calc(100%-4px)] px-4 flex items-center gap-2 border-r-2 border-gray-200 bg-gray-50/50 hover:bg-gray-100 rounded-l-lg transition-colors z-10"
                    >
                      <span className="text-base font-semibold text-gray-900">{countryCode}</span>
                      <svg 
                        className={`w-4 h-4 text-gray-500 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isCountryDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40 bg-transparent"
                          onClick={() => setIsCountryDropdownOpen(false)}
                        ></div>
                        
                        <div className="absolute z-50 left-0 top-full w-64 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                          <ul className="py-2">
                            {countryCodes.map((item, index) => (
                              <li key={`${item.code}-${item.country}-${index}`} id={`country-item-${item.code}`}>
                                <button
                                  type="button"
                                  onClick={() => handleCountryCodeSelect(item.code)}
                                  className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                                    countryCode === item.code ? 'bg-blue-50 text-[#1D4ED8] font-semibold' : 'text-gray-700'
                                  }`}
                                >
                                  <span className="text-2xl">{item.flag}</span>
                                  <span className="font-semibold text-base">{item.code}</span>
                                  <span className="text-sm text-gray-500">{item.country}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}

                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="1234567890"
                      required
                      maxLength={15}
                      suppressHydrationWarning
                      style={{ paddingLeft: '110px' }}
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all text-base text-gray-900 placeholder:text-gray-400 bg-gray-50/50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all text-base text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                  Interested In
                </label>
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 sm:py-3.5 border-2 rounded-lg text-left flex items-center justify-between outline-none transition-all duration-300 ${
                      isDropdownOpen 
                        ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/20 bg-white' 
                        : 'border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className={`text-base font-medium ${formData.course ? 'text-gray-900' : 'text-gray-400'}`}>
                      {formData.course 
                        ? courseOptions.find(opt => opt.value === formData.course)?.label 
                        : 'Select a course'}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#1D4ED8]' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop for mobile to close when clicking outside */}
                      <div 
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => setIsDropdownOpen(false)}
                      ></div>
                      
                      {/* Menu List */}
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 sm:max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                        <ul className="py-2">
                          {courseOptions.map((option) => (
                            <li key={option.value}>
                              <button
                                type="button"
                                onClick={() => handleCourseSelect(option.value)}
                                className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                  formData.course === option.value ? 'bg-blue-50 text-[#1D4ED8] font-semibold' : 'text-gray-700 font-medium'
                                }`}
                              >
                                <span>{option.label}</span>
                                {formData.course === option.value && (
                                  <svg className="w-5 h-5 text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your goals..."
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all resize-none text-base text-gray-900 placeholder:text-gray-500"
                ></textarea>
              </div>
              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-6 group">
                <div className="relative flex items-center h-6">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-blue-500 text-blue-600 transition-all cursor-pointer peer checked:border-blue-600"
                  />
                  <svg
                    className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                  I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">Terms & Conditions</a> and <a href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !acceptedTerms}
                className="w-full relative overflow-hidden rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
              >
                {/* Smooth Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#E63946] via-[#1D4ED8] to-[#E63946] bg-[length:200%_auto] animate-gradient-smooth"></div>

                {/* Soft Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:!translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

                {/* Button Content */}
                <div className="relative z-10 py-4 px-8 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Your Journey Here</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Contact Info Cards - Compact 1x1 on Mobile, 2x2 on Tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Visit Us */}
              <a
                href="https://www.google.com/maps/search/Sparkle+Knowledge+Yard,+Perambur,+Chennai/@13.1146754,80.2329381,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[140px]"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full justify-between">
                  {/* Icon and Title - Horizontal Layout */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <div className="absolute inset-0 bg-blue-500/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">Visit Us</h4>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex items-center">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 text-[13px] leading-relaxed font-semibold">
                      2nd Floor, 331, Paper Mills Road, Bunder Garden, Perambur, Chennai 600011
                    </p>
                  </div>
                </div>
              </a>

              {/* Call Us */}
              <div className="group relative bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[140px]">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full justify-between">
                  {/* Icon and Title - Horizontal Layout */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <div className="absolute inset-0 bg-red-500/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-red-600 transition-colors">Call Us</h4>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <a 
                      href="tel:+919710043295" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = 'tel:+919710043295';
                      }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 text-[15px] font-bold hover:from-red-700 hover:to-red-900 transition-all block mb-1 cursor-pointer"
                    >
                      +91 97100 43295
                    </a>
                    <a 
                      href="tel:+919791740664" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = 'tel:+919791740664';
                      }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 text-[15px] font-bold hover:from-red-700 hover:to-red-900 transition-all block mb-1.5 cursor-pointer"
                    >
                      +91 97917 40664
                    </a>
                    <p className="text-gray-700 text-[11px] font-semibold leading-relaxed">Monday to Saturday<br />9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Email Us */}
              <div className="group relative bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[140px]">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full justify-between">
                  {/* Icon and Title - Horizontal Layout */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <div className="absolute inset-0 bg-orange-500/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">Email Us</h4>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center space-y-3">
                    <a 
                      href="mailto:contact@sparkleknowledgeyard.com"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = 'mailto:contact@sparkleknowledgeyard.com';
                      }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 text-[13px] hover:from-orange-700 hover:to-orange-900 transition-all block truncate font-bold cursor-pointer"
                    >
                      contact@sparkleknowledgeyard.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="group relative bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[140px]">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full justify-between">
                  {/* Icon and Title - Horizontal Layout */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">Working Hours</h4>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-600 text-[11px] font-semibold">Monday to Friday</span>
                        </div>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900 text-[13px] font-bold pl-3">9:00 AM - 8:00 PM</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                          <span className="text-gray-600 text-[11px] font-semibold">Saturday to Sunday</span>
                        </div>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900 text-[13px] font-bold pl-3">10:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map - Clickable to Open */}
            <a
              href="https://www.google.com/maps/search/Sparkle+Knowledge+Yard,+Perambur,+Chennai/@13.1146754,80.2329381,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-56 sm:h-64 lg:h-72 cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              <iframe
                src="https://maps.google.com/maps?q=Sparkle%20Knowledge%20Yard,%20331,%20Paper%20Mills%20Road,%20Bunder%20Garden,%20Perambur,%20Chennai&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="pointer-events-none"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sparkle Knowledge Yard Location"
              ></iframe>

              {/* Map Overlay Badge */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300 z-10 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl shadow-blue-500/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2.5 border border-white/50">
                  <MapPin className="w-4 h-4 text-[#1D4ED8]" />
                  <span className="text-sm font-bold text-gray-900">Open Location</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* SUPER PROFESSIONAL Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Premium Backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-black/80 backdrop-blur-xl"
            onClick={() => setShowSuccessModal(false)}
            style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          ></div>

          {/* Modal Container */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            style={{ animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Close X Button - Modern & Minimal */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-20"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content Container */}
            <div className="p-8 sm:p-12 text-center relative overflow-hidden">
              {/* Soft decorative background blobs */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

              {/* Success Icon - Central & Animated */}
              <div className="relative flex justify-center mb-6 z-10">
                <div className="relative">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1D4ED8] to-[#E63946] rounded-full opacity-10 animate-ping"></div>

                  {/* Icon Circle */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#1D4ED8] to-[#E63946] rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20"
                    style={{ animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both' }}
                  >
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ animation: 'checkDraw 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.3s both' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 space-y-3">
                <h3
                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                  style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
                >
                  Message Sent!
                </h3>

                <p
                  className="text-gray-500 font-medium"
                  style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}
                >
                  We've received your inquiry
                </p>

                <div
                  className="pt-4"
                  style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' }}
                >
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. Our team will review your message and respond within <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#E63946]">24 hours</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes checkDraw {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          to {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes fly {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          20% {
            transform: translateX(-10px) translateY(10px) scale(0.9);
          }
          100% {
            transform: translateX(100px) translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes gradient-smooth {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fly {
          animation: fly 0.6s ease-in-out forwards;
        }

        .animate-gradient-smooth {
          animation: gradient-smooth 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
