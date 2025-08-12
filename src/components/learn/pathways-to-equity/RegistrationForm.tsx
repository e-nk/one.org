'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { X, Loader2, CheckCircle, Mail, User, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

// Minimal form validation schema
const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Please select your country'),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms to continue')
});

type FormData = z.infer<typeof registrationSchema>;

// Country options
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema)
  });

  const watchedTerms = watch('agreeTerms');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Prepare minimal submission data
      const submissionData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        country: data.country
      };

      // Submit to API
      const response = await fetch('/api/moodle/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Registration failed. Please try again.');
      }

      // Success
      setIsSuccess(true);

    } catch (error) {
      console.error('Registration error:', error);
      setError('root', {
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      // Show success toast when closing after successful registration
      toast.success("Account created successfully!", {
        description: "Check your email for login credentials",
        duration: 5000,
      });
    }
    
    // Reset form and states
    reset();
    setIsSubmitting(false);
    setIsSuccess(false);
    onClose();
  };

  const renderFormContent = () => {
    if (isSuccess) {
      return (
        <div className="text-center py-6 sm:py-8">
          {/* Success Animation */}
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 bg-one-primary-plum/20 rounded-full animate-ping mx-auto"></div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-one-primary-plum rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={3} />
            </div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-one-primary-neon rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-one-primary-black" />
            </div>
          </div>
          
          <AlertDialogHeader className="space-y-3 sm:space-y-4">
            <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-one-primary-black font-italian-plate">
              You're In! 🎉
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 font-colfax text-sm sm:text-base leading-relaxed">
              Welcome to ONE Academy! Check your email for login credentials and start your learning journey.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-one-primary-neon/10 border border-one-primary-neon/30 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 text-one-primary-plum font-semibold font-colfax">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Login details sent to your email</span>
            </div>
          </div>

          <AlertDialogAction
            onClick={handleClose}
            className="bg-one-primary-plum hover:bg-one-primary-plum/90 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-colfax transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
          >
            Continue
            <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
          </AlertDialogAction>
        </div>
      );
    }

    return (
      <div className="relative">
        {/* Decorative Background - hidden on mobile for cleaner look */}
        <div className="hidden sm:block absolute -top-20 -right-20 w-40 h-40 bg-one-primary-neon/5 rounded-full blur-3xl"></div>
        <div className="hidden sm:block absolute -bottom-10 -left-10 w-32 h-32 bg-one-primary-plum/8 rounded-full blur-2xl"></div>
        
        {/* Header - Compact on mobile */}
        <div className="relative text-center mb-5 sm:mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-gray-100 rounded-full z-10"
            disabled={isSubmitting}
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-one-primary-plum via-one-primary-teal to-one-primary-neon rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
          </div>
          
          <AlertDialogTitle className="text-lg sm:text-2xl font-bold text-one-primary-black font-italian-plate mb-1 sm:mb-2 leading-tight">
            Join ONE Academy
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 font-colfax text-xs sm:text-base">
            Start "Pathways to Equity" — completely free
          </AlertDialogDescription>
        </div>

        {/* Error Message */}
        {errors.root && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              </div>
              <p className="text-red-700 font-colfax text-xs sm:text-sm">{errors.root.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 sm:space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-one-primary-black font-colfax">
                First Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-colors group-focus-within:text-one-primary-plum" />
                <input
                  {...register('firstName')}
                  type="text"
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl font-colfax text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 placeholder:text-gray-400 ${
                    errors.firstName 
                      ? 'border-red-300 bg-red-50 focus:border-red-400' 
                      : 'border-gray-200 focus:border-one-primary-plum bg-white hover:border-gray-300'
                  }`}
                  placeholder="First name"
                  disabled={isSubmitting}
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-600 font-colfax">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-one-primary-black font-colfax">
                Last Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-colors group-focus-within:text-one-primary-plum" />
                <input
                  {...register('lastName')}
                  type="text"
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl font-colfax text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 placeholder:text-gray-400 ${
                    errors.lastName 
                      ? 'border-red-300 bg-red-50 focus:border-red-400' 
                      : 'border-gray-200 focus:border-one-primary-plum bg-white hover:border-gray-300'
                  }`}
                  placeholder="Last name"
                  disabled={isSubmitting}
                />
              </div>
              {errors.lastName && (
                <p className="text-xs text-red-600 font-colfax">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-one-primary-black font-colfax">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-colors group-focus-within:text-one-primary-plum" />
              <input
                {...register('email')}
                type="email"
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl font-colfax text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 placeholder:text-gray-400 ${
                  errors.email 
                    ? 'border-red-300 bg-red-50 focus:border-red-400' 
                    : 'border-gray-200 focus:border-one-primary-plum bg-white hover:border-gray-300'
                }`}
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email ? (
              <p className="text-xs text-red-600 font-colfax">{errors.email.message}</p>
            ) : (
              <p className="text-xs text-gray-500 font-colfax">
                Login credentials sent here
              </p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-one-primary-black font-colfax">
              Country
            </label>
            <div className="relative group">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-colors group-focus-within:text-one-primary-plum" />
              <select
                {...register('country')}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl font-colfax text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-one-primary-plum/20 bg-white cursor-pointer ${
                  errors.country 
                    ? 'border-red-300 bg-red-50 focus:border-red-400' 
                    : 'border-gray-200 focus:border-one-primary-plum hover:border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="" className="text-gray-400">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country} className="text-gray-900">
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {errors.country && (
              <p className="text-xs text-red-600 font-colfax">{errors.country.message}</p>
            )}
          </div>

          {/* Terms Agreement - More compact on mobile */}
          <div className="relative">
            <div className="flex items-start space-x-2.5 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-one-primary-plum/5 border border-gray-200 rounded-lg sm:rounded-xl hover:border-one-primary-plum/30 transition-colors duration-200">
              <div className="flex items-center h-4 sm:h-5 mt-0.5">
                <input
                  {...register('agreeTerms')}
                  type="checkbox"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-one-primary-plum border-gray-300 rounded focus:ring-one-primary-plum focus:ring-2 transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              <div className="text-xs sm:text-sm font-colfax leading-relaxed">
                <label className={`cursor-pointer block ${errors.agreeTerms ? 'text-red-600' : 'text-gray-700'}`}>
                  I agree to the{' '}
                  <a 
                    href="/terms" 
                    target="_blank" 
                    className="text-one-primary-plum hover:text-one-primary-teal font-semibold underline decoration-2 underline-offset-2 hover:underline-offset-4 transition-all duration-200"
                  >
                    Terms
                  </a>{' '}
                  and{' '}
                  <a 
                    href="/privacy" 
                    target="_blank" 
                    className="text-one-primary-plum hover:text-one-primary-teal font-semibold underline decoration-2 underline-offset-2 hover:underline-offset-4 transition-all duration-200"
                  >
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-red-600 text-xs font-medium">{errors.agreeTerms.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button - Compact on mobile */}
          <div className="pt-1 sm:pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || !watchedTerms}
              className="w-full h-10 sm:h-12 bg-one-primary-plum hover:bg-one-primary-black text-white font-bold rounded-lg sm:rounded-xl text-sm sm:text-base font-colfax transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] group"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Start Learning Free</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => !isSubmitting && handleClose()}>
      <AlertDialogContent className="max-w-md w-[90vw] sm:w-[95vw] max-h-[90vh] p-0 border-0 shadow-2xl bg-transparent overflow-y-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderFormContent()}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}