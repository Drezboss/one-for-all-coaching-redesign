import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface EnhancedFormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  defaultValues?: Partial<z.infer<T>>;
  fields: FormField[];
  submitText?: string;
  loadingText?: string;
  className?: string;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "select" | "tel";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  validation?: string;
}

export function EnhancedForm<T extends z.ZodType>({
  schema,
  onSubmit,
  defaultValues,
  fields,
  submitText = "Submit",
  loadingText = "Submitting...",
  className = "",
}: EnhancedFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<T>,
  });

  const handleSubmit = async (data: z.infer<T>) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      await onSubmit(data);
      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name as keyof z.infer<T>}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel className="text-white font-semibold flex items-center">
              {field.label}
              {field.required && <span className="text-lfc-red ml-1">*</span>}
            </FormLabel>
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea
                  {...formField}
                  placeholder={field.placeholder}
                  className="form-input min-h-[100px] resize-none"
                  disabled={isSubmitting}
                />
              ) : field.type === "select" ? (
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder={field.placeholder || "Select an option"} />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700">
                    {field.options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-white hover:bg-gray-800 focus:bg-gray-800"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  {...formField}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="form-input"
                  disabled={isSubmitting}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {fields.map(renderField)}
          
          <Button
            type="submit"
            className="w-full btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {loadingText}
              </>
            ) : (
              submitText
            )}
          </Button>
        </form>
      </Form>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="flex items-center space-x-2 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">Form submitted successfully!</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center space-x-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-medium">Something went wrong. Please try again.</span>
        </div>
      )}
    </div>
  );
}

// Enhanced Input Component
interface EnhancedInputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel";
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function EnhancedInput({
  label,
  placeholder,
  type = "text",
  required = false,
  icon,
  error,
  value,
  onChange,
  disabled = false,
}: EnhancedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-white font-semibold flex items-center">
        {label}
        {required && <span className="text-lfc-red ml-1">*</span>}
      </label>
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-lfc-red transition-colors duration-200">
            {icon}
          </div>
        )}
        
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`form-input ${icon ? 'pl-12' : ''} ${error ? 'border-red-500' : ''} ${
            isFocused ? 'ring-2 ring-lfc-red/20' : ''
          }`}
          disabled={disabled}
        />
      </div>
      
      {error && (
        <p className="text-red-400 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}