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
import { User, Shield, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

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
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-navy to-almost-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-lfc-red to-bright-red rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Coach <span className="text-gradient">LOGIN</span>
          </h1>
          <p className="text-gray-300">Access your coaching dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="bg-almost-black border-gray-800 shadow-2xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Enter your username"
                            className="bg-black border-gray-700 text-white pl-10 focus:border-lfc-red focus:ring-lfc-red/20 transition-all duration-200"
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
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="bg-black border-gray-700 text-white pl-10 pr-10 focus:border-lfc-red focus:ring-lfc-red/20 transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-lfc-red text-white hover:bg-bright-red font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-4">
                  Need help accessing your account?
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    Contact: <span className="text-lfc-red">+44 7750 887112</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Email: <span className="text-lfc-red">dave@all-4one-coaching.com</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-gray-400 hover:text-lfc-red transition-colors duration-200 text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}