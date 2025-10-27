import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle, Eye, EyeOff } from "lucide-react";

// Enhanced Input Component
interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  isLoading?: boolean;
  showValidation?: boolean;
  helperText?: string;
}

export function EnhancedInput({
  label,
  error,
  success,
  isLoading = false,
  showValidation = true,
  helperText,
  className = "",
  type = "text",
  ...props
}: EnhancedInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const getStatusColor = () => {
    if (error) return "border-red-500 focus:ring-red-500";
    if (success) return "border-green-500 focus:ring-green-500";
    return "border-gray-700 focus:ring-lfc-red focus:border-lfc-red";
  };

  const getStatusIcon = () => {
    if (isLoading) return <div className="w-4 h-4 border-2 border-lfc-red border-r-transparent rounded-full animate-spin" />;
    if (error) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (success) return <Check className="w-4 h-4 text-green-500" />;
    return null;
  };

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-medium text-gray-200"
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.input
          {...props}
          type={inputType}
          className={`
            w-full px-4 py-3 pr-12 rounded-lg bg-gray-900/50 border backdrop-blur-sm
            text-white placeholder-gray-400 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
            ${getStatusColor()}
            ${focused ? 'transform scale-[1.02]' : ''}
            ${className}
          `}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
        />
        
        {/* Status Icon */}
        <div className="absolute inset-y-0 right-3 flex items-center">
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : (
            showValidation && getStatusIcon()
          )}
        </div>
        
        {/* Focus Ring Animation */}
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 rounded-lg border-2 border-lfc-red/30 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Helper Text, Error, or Success Message */}
      <AnimatePresence mode="wait">
        {(error || success || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-sm"
          >
            {error && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-red-500">{error}</span>
              </>
            )}
            {success && !error && (
              <>
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-green-500">{success}</span>
              </>
            )}
            {helperText && !error && !success && (
              <span className="text-gray-400">{helperText}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced Textarea Component
interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export function EnhancedTextarea({
  label,
  error,
  success,
  helperText,
  showCharCount = false,
  maxLength,
  className = "",
  value = "",
  ...props
}: EnhancedTextareaProps) {
  const [focused, setFocused] = useState(false);
  const charCount = String(value).length;

  const getStatusColor = () => {
    if (error) return "border-red-500 focus:ring-red-500";
    if (success) return "border-green-500 focus:ring-green-500";
    return "border-gray-700 focus:ring-lfc-red focus:border-lfc-red";
  };

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-medium text-gray-200"
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.textarea
          {...props}
          value={value}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 rounded-lg bg-gray-900/50 border backdrop-blur-sm
            text-white placeholder-gray-400 transition-all duration-300 resize-none
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
            min-h-[120px]
            ${getStatusColor()}
            ${focused ? 'transform scale-[1.01]' : ''}
            ${className}
          `}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
        />
        
        {/* Character Count */}
        {showCharCount && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {charCount}{maxLength && `/${maxLength}`}
          </div>
        )}
        
        {/* Focus Ring Animation */}
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="absolute inset-0 rounded-lg border-2 border-lfc-red/30 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Messages */}
      <AnimatePresence mode="wait">
        {(error || success || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-sm"
          >
            {error && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-red-500">{error}</span>
              </>
            )}
            {success && !error && (
              <>
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-green-500">{success}</span>
              </>
            )}
            {helperText && !error && !success && (
              <span className="text-gray-400">{helperText}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Form Progress Indicator
interface FormProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function FormProgress({ steps, currentStep, className = "" }: FormProgressProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                transition-all duration-300
                ${index <= currentStep 
                  ? 'bg-lfc-red text-white shadow-lg shadow-lfc-red/25' 
                  : 'bg-gray-700 text-gray-400'
                }
              `}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <div className="w-16 h-1 mx-4 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full bg-lfc-red"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-sm text-gray-400">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </span>
      </div>
    </div>
  );
}

// Success/Error Toast Component
interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ type, message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-600 border-green-500";
      case "error":
        return "bg-red-600 border-red-500";
      case "info":
        return "bg-blue-600 border-blue-500";
      default:
        return "bg-gray-600 border-gray-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5" />;
      case "error":
        return <X className="w-5 h-5" />;
      case "info":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className={`
            fixed top-6 right-6 z-50 p-4 rounded-lg border backdrop-blur-md
            flex items-center space-x-3 text-white shadow-xl
            ${getToastStyles()}
          `}
        >
          {getIcon()}
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 hover:opacity-75 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Form Validation Hook
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = (name: keyof T, value: any) => {
    const rule = validationRules[name];
    if (rule) {
      const error = rule(value);
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    }
    return null;
  };

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  };

  const validateAll = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(key => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0
  };
}