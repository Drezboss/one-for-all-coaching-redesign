import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
}

export function FloatingLabelInput({ 
  label, 
  error, 
  success, 
  className, 
  value,
  onFocus,
  onBlur,
  ...props 
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="relative">
      <Input
        {...props}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "peer pt-6 pb-2 transition-all",
          error && "border-destructive focus:border-destructive",
          success && "border-green-500 focus:border-green-500",
          className
        )}
      />
      <Label
        className={cn(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isFocused || hasValue
            ? "top-2 text-xs text-muted-foreground"
            : "top-1/2 -translate-y-1/2 text-base",
          error && "text-destructive"
        )}
      >
        {label}
      </Label>
      {success && (
        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
      )}
      {error && (
        <div className="flex items-center mt-1 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export function FormProgress({ currentStep, totalSteps, stepLabels }: FormProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {stepLabels?.map((label, index) => (
          <span
            key={index}
            className={cn(
              "text-xs font-medium transition-colors",
              index < currentStep
                ? "text-primary"
                : index === currentStep
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
              index < currentStep
                ? "bg-primary text-primary-foreground"
                : index === currentStep
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-muted text-muted-foreground"
            )}
          >
            {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date;
}

export function AutoSaveIndicator({ isSaving, lastSaved }: AutoSaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);

  if (isSaving) {
    return (
      <div className="flex items-center text-sm text-muted-foreground">
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
        Saving...
      </div>
    );
  }

  if (showSaved && lastSaved) {
    return (
      <div className="flex items-center text-sm text-green-600 dark:text-green-400 animate-fadeInUp">
        <Check className="w-4 h-4 mr-1" />
        Saved
      </div>
    );
  }

  return null;
}