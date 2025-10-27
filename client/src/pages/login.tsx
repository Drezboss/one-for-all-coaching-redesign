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
import { User, Shield, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useLocation, Link } from "wouter";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      apiRequest("POST", "/api/auth/login", data),
    onSuccess: (response: any) => {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      // Ensure we're storing the user object correctly
      const userData = response.user || response;
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Redirect based on user role
      if (userData.role === "parent") {
        setLocation("/parent-dashboard");
      } else {
        setLocation("/admin");
      }
    },
    onError: (error: any) => {
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background with animated elements */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Animated background dots */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-lfc-red rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-lfc-red rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-lfc-red rounded-full animate-bounce"></div>
      </div>

      {/* Back to home link */}
      <Link href="/" className="absolute top-8 left-8 text-white hover:text-lfc-red transition-colors duration-200 group">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md bg-black/80 backdrop-blur-md border-gray-800 shadow-2xl animate-fade-in-up">
        <CardHeader className="text-center pb-8">
          <div className="w-20 h-20 bg-lfc-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-black text-white mb-2">
            Coach <span className="text-gradient">LOGIN</span>
          </CardTitle>
          <p className="text-gray-300">Access your coaching dashboard</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Username</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-lfc-red transition-colors duration-200" />
                        <Input
                          {...field}
                          placeholder="Enter your username"
                          className="form-input pl-12 h-12 text-lg"
                          disabled={loginMutation.isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Password</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-lfc-red transition-colors duration-200" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="form-input pl-12 pr-12 h-12 text-lg"
                          disabled={loginMutation.isPending}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                          disabled={loginMutation.isPending}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-lfc-red hover:bg-bright-red text-white font-bold text-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <span className="text-gray-400 text-sm">or</span>
              <div className="w-8 h-0.5 bg-gray-600"></div>
            </div>
            
            <Link href="/register">
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:border-lfc-red hover:text-lfc-red transition-all duration-200">
                Create New Account
              </Button>
            </Link>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">
                <Shield className="inline-block w-4 h-4 mr-1" />
                For coach access only
              </p>
              <p className="text-gray-500 text-xs">
                Contact admin for account setup
              </p>
            </div>

            {/* Contact info */}
            <div className="bg-lfc-red/10 rounded-lg p-4 border border-lfc-red/20">
              <p className="text-gray-300 text-sm mb-1">Need help?</p>
              <p className="text-lfc-red font-semibold">+44 7750 887112</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}