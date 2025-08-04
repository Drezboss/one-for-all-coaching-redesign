import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { User, Shield, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      apiRequest("POST", "/api/auth/login", data),
    onSuccess: (response: any) => {
      setIsSuccess(true);
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting...",
        className: "border-green-500",
      });
      // Ensure we're storing the user object correctly
      const userData = response.user || response;
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Add a slight delay for better UX
      setTimeout(() => {
        // Redirect based on user role
        if (userData.role === "parent") {
          setLocation("/parent-dashboard");
        } else {
          setLocation("/admin");
        }
      }, 1000);
    },
    onError: (error: any) => {
      // Add form shake animation on error
      const formElement = document.getElementById("login-form");
      formElement?.classList.add("animate-shake");
      setTimeout(() => {
        formElement?.classList.remove("animate-shake");
      }, 500);
      
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const isFieldValid = (fieldName: keyof LoginFormData) => {
    const fieldState = form.getFieldState(fieldName);
    return fieldState.isDirty && !fieldState.error;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-almost-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <Card className={cn(
        "w-full max-w-md bg-almost-black/90 backdrop-blur-md border-gray-800 shadow-2xl transition-all duration-500",
        isSuccess && "scale-105 border-green-500"
      )}>
        <CardHeader className="text-center">
          <div className={cn(
            "w-16 h-16 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500",
            isSuccess && "bg-green-500 scale-110"
          )}>
            {isSuccess ? (
              <CheckCircle2 className="w-8 h-8 text-white animate-in zoom-in duration-300" />
            ) : (
              <Shield className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-3xl font-black text-white">
            Coach <span className="text-lfc-red">LOGIN</span>
          </CardTitle>
          <p className="text-gray-300 mt-2">Access your coaching dashboard</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form 
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-5"
              noValidate // Use our own validation
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold flex items-center justify-between">
                      Username
                      {isFieldValid("username") && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 animate-in zoom-in duration-200" />
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className={cn(
                          "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                          form.formState.errors.username ? "text-red-400" : "text-gray-400 group-focus-within:text-lfc-red"
                        )} />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your username"
                          autoComplete="username"
                          aria-label="Username"
                          aria-invalid={!!form.formState.errors.username}
                          aria-describedby="username-error"
                          className={cn(
                            "bg-black/50 border-gray-700 text-white pl-10 transition-all duration-200",
                            "focus:border-lfc-red focus:ring-2 focus:ring-lfc-red/20",
                            "placeholder:text-gray-500",
                            form.formState.errors.username && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage id="username-error" className="text-red-400 text-sm mt-1 animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold flex items-center justify-between">
                      Password
                      {isFieldValid("password") && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 animate-in zoom-in duration-200" />
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Shield className={cn(
                          "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                          form.formState.errors.password ? "text-red-400" : "text-gray-400 group-focus-within:text-lfc-red"
                        )} />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          aria-label="Password"
                          aria-invalid={!!form.formState.errors.password}
                          aria-describedby="password-error"
                          className={cn(
                            "bg-black/50 border-gray-700 text-white pl-10 pr-10 transition-all duration-200",
                            "focus:border-lfc-red focus:ring-2 focus:ring-lfc-red/20",
                            "placeholder:text-gray-500",
                            form.formState.errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={cn(
                            "absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200",
                            "text-gray-400 hover:text-white focus:text-white",
                            "focus:outline-none focus:ring-2 focus:ring-lfc-red/20 rounded-sm"
                          )}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage id="password-error" className="text-red-400 text-sm mt-1 animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={cn(
                  "w-full bg-lfc-red hover:bg-bright-red text-white font-bold py-3 text-lg transition-all duration-300",
                  "hover:scale-105 hover:shadow-lg active:scale-95",
                  "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                )}
                disabled={loginMutation.isPending || isSuccess}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Success!
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Error feedback */}
              {loginMutation.isError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start space-x-2 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-400">
                    Invalid credentials. Please check your username and password.
                  </div>
                </div>
              )}
            </form>
          </Form>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              For coach access only. Contact admin for account setup.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}