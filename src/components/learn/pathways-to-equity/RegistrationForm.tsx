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
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X, Loader2, CheckCircle, Mail, User, Globe } from 'lucide-react';
import { toast } from 'sonner';

// Form validation schema
const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Please select your country'),
  education: z.string().min(1, 'Please select your education level'),
  career: z.string().min(1, 'Please select your career/profession'),
  careerOther: z.string().optional(),
  background: z.string().max(500, 'Background description is too long').optional(),
  reason: z.string().max(1000, 'Reason is too long').optional(),
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

const educationLevels = [
  "High School",
  "Undergraduate Degree", 
  "Postgraduate Degree (Masters/PhD)"
];

const careerOptions = [
  "Student",
  "Teacher/Educator",
  "Healthcare Professional", 
  "Business/Finance",
  "Technology/Engineering",
  "Legal Professional",
  "Government/Public Service",
  "Non-Profit/NGO",
  "Arts/Creative",
  "Marketing/Communications",
  "Research/Academic",
  "Consultant",
  "Entrepreneur",
  "Retired",
  "Unemployed/Job Seeking",
  "Other"
];

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema)
  });

  const watchedCareer = watch('career');
  const watchedTerms = watch('agreeTerms');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitProgress(10);
    setSubmitError(null);

    try {
      // Prepare submission data
      const submissionData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        country: data.country,
        education: data.education,
        career: data.career === 'Other' ? data.careerOther?.trim() : data.career,
        background: data.background?.trim() || '',
        reason: data.reason?.trim() || ''
      };

      setSubmitProgress(30);

      // Submit to API
      const response = await fetch('/api/moodle/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      setSubmitProgress(70);

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Registration failed. Please try again.');
      }

      setSubmitProgress(100);

      // Success - show success state
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
      }, 500);

    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsSubmitting(false);
      setSubmitProgress(0);
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
    setSubmitProgress(0);
    setIsSuccess(false);
    setSubmitError(null);
    onClose();
  };

  const renderFormContent = () => {
    if (isSuccess) {
      return (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-one-primary-neon rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-one-primary-black" />
          </div>
          
          <AlertDialogHeader className="space-y-4">
            <AlertDialogTitle className="text-2xl lg:text-3xl font-bold text-one-primary-black font-italian-plate">
              Welcome to ONE Academy!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base lg:text-lg text-gray-600 font-colfax leading-relaxed">
              Your enrollment in "Pathways to Equity" has been completed successfully. 
              Check your email for login credentials and course access instructions.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-one-primary-neon/10 border border-one-primary-neon/20 rounded-xl p-6 mt-6 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Mail className="w-5 h-5 text-one-primary-plum" />
              <span className="font-semibold text-one-primary-black font-colfax">Check Your Email</span>
            </div>
            <p className="text-sm text-gray-600 font-colfax">
              We've sent you login credentials and next steps to get started with your learning journey.
            </p>
          </div>

          <AlertDialogAction
            onClick={handleClose}
            className="bg-one-primary-plum hover:bg-one-primary-plum/90 text-white font-semibold px-8 py-3 rounded-xl font-colfax"
          >
            Continue
          </AlertDialogAction>
        </div>
      );
    }

    return (
      <div>
        <AlertDialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <AlertDialogTitle className="text-xl lg:text-2xl font-bold text-one-primary-black font-italian-plate">
                Join ONE Academy
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 font-colfax mt-2">
                Enroll in "Pathways to Equity" - Free Course
              </AlertDialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </AlertDialogHeader>

        {/* Progress Bar - Only show when submitting */}
        {isSubmitting && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-one-primary-plum font-colfax">
                Creating your account...
              </span>
              <span className="text-sm text-gray-500">{submitProgress}%</span>
            </div>
            <Progress value={submitProgress} className="h-2" />
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm font-colfax">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register('firstName')}
                  type="text"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 ${
                    errors.firstName 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-one-primary-teal'
                  }`}
                  placeholder="Enter your first name"
                  disabled={isSubmitting}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 font-colfax">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
                Last Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register('lastName')}
                  type="text"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 ${
                    errors.lastName 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-one-primary-teal'
                  }`}
                  placeholder="Enter your last name"
                  disabled={isSubmitting}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 font-colfax">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 ${
                  errors.email 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-one-primary-teal'
                }`}
                placeholder="name@example.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 font-colfax">{errors.email.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 font-colfax">
              We'll send login details to this email
            </p>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
              Country *
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                {...register('country')}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 bg-white ${
                  errors.country 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-one-primary-teal'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600 font-colfax">{errors.country.message}</p>
            )}
          </div>

          {/* Education & Career Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
                Education Level *
              </label>
              <select
                {...register('education')}
                className={`w-full px-4 py-3 border-2 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 bg-white ${
                  errors.education 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-one-primary-teal'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select education level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.education && (
                <p className="mt-1 text-sm text-red-600 font-colfax">{errors.education.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
                Career/Profession *
              </label>
              <select
                {...register('career')}
                className={`w-full px-4 py-3 border-2 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 bg-white ${
                  errors.career 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-one-primary-teal'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select career/profession</option>
                {careerOptions.map((career) => (
                  <option key={career} value={career}>
                    {career}
                  </option>
                ))}
              </select>
              {errors.career && (
                <p className="mt-1 text-sm text-red-600 font-colfax">{errors.career.message}</p>
              )}
            </div>
          </div>

          {/* Career Other Input */}
          {watchedCareer === 'Other' && (
            <div>
              <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
                Please specify your career/profession *
              </label>
              <input
                {...register('careerOther')}
                type="text"
                className={`w-full px-4 py-3 border-2 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 ${
                  errors.careerOther 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-one-primary-teal'
                }`}
                placeholder="Enter your career/profession"
                disabled={isSubmitting}
              />
              {errors.careerOther && (
                <p className="mt-1 text-sm text-red-600 font-colfax">{errors.careerOther.message}</p>
              )}
            </div>
          )}

          {/* Optional Fields */}
          <div>
            <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
              Additional Background <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              {...register('background')}
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 focus:border-one-primary-teal"
              placeholder="Any additional professional background"
              disabled={isSubmitting}
            />
            {errors.background && (
              <p className="mt-1 text-sm text-red-600 font-colfax">{errors.background.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-one-primary-black mb-2 font-colfax">
              Why are you interested in this course? <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <textarea
              {...register('reason')}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-colfax transition-colors focus:outline-none focus:ring-2 focus:ring-one-primary-neon/20 focus:border-one-primary-teal resize-none"
              placeholder="Tell us what motivated you to join this course"
              disabled={isSubmitting}
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600 font-colfax">{errors.reason.message}</p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
            <input
              {...register('agreeTerms')}
              type="checkbox"
              className="mt-0.5 h-4 w-4 text-one-primary-neon border-gray-300 rounded focus:ring-one-primary-neon"
              disabled={isSubmitting}
            />
            <div className="text-sm font-colfax">
              <label className={`cursor-pointer ${errors.agreeTerms ? 'text-red-600' : 'text-gray-700'}`}>
                I agree to the{' '}
                <a href="/terms" target="_blank" className="text-one-primary-teal hover:underline font-semibold">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" className="text-one-primary-teal hover:underline font-semibold">
                  Privacy Policy
                </a>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-red-600">{errors.agreeTerms.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !watchedTerms}
            className="w-full py-4 bg-one-primary-plum hover:bg-one-primary-plum/90 text-white font-semibold rounded-xl text-base font-colfax transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Creating Account...
              </>
            ) : (
              'Enroll Now - Free'
            )}
          </Button>
        </form>
      </div>
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => !isSubmitting && handleClose()}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          {renderFormContent()}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}