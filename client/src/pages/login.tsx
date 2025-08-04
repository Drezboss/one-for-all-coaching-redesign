import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { User, Shield, Eye, EyeOff, Lock, Mail, AlertTriangle, CheckCircle, ArrowRight, Loader2, Sparkles, LogIn } from "lucide-react";
import { useLocation, Link } from "wouter";
import { PageTransition } from "@/components/page-transition";

const loginSchema = z.object({
  username: z.string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const { watch, formState: { errors, isValid } } = form;
  const watchedValues = watch();

  // Account lockout timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimer]);

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      apiRequest("POST", "/api/auth/login", data),
    onSuccess: (response: any) => {
      setLoginAttempts(0);
      toast({
        title: "🎉 Welcome Back!",
        description: "Successfully signed in to your account.",
      });
      
      const userData = response.user || response;
      localStorage.setItem("user", JSON.stringify(userData));
      
      if (userData.role === "parent") {
        setLocation("/parent-dashboard");
      } else {
        setLocation("/admin");
      }
    },
    onError: (error: any) => {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTimer(300); // 5 minutes
        toast({
          title: "🔒 Account Temporarily Locked",
          description: "Too many failed attempts. Please try again in 5 minutes.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "❌ Login Failed",
          description: error.message || `Invalid credentials. ${3 - newAttempts} attempts remaining.`,
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (isLocked) return;
    loginMutation.mutate(data);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak", color: "text-red-500" };
    if (password.length < 8) return { strength: 2, label: "Fair", color: "text-yellow-500" };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 3, label: "Strong", color: "text-green-500" };
    }
    return { strength: 2, label: "Fair", color: "text-yellow-500" };
  };

  const passwordStrength = getPasswordStrength(watchedValues.password || "");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="card-elevated backdrop-blur-sm bg-card/95 border-2">
            <CardHeader className="text-center space-y-6 pb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
              >
                <Shield className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              
              <div className="space-y-2">
                <CardTitle className="text-3xl font-black text-foreground flex items-center justify-center gap-2">
                  <LogIn className="w-6 h-6 text-primary" />
                  Welcome Back
                </CardTitle>
                <p className="text-muted-foreground">
                  Sign in to access your coaching dashboard
                </p>
              </div>

              {/* Login Attempts Warning */}
              <AnimatePresence>
                {loginAttempts > 0 && !isLocked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 text-yellow-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {loginAttempts} failed attempt{loginAttempts > 1 ? 's' : ''} • {3 - loginAttempts} remaining
                      </span>
                    </div>
                  </motion.div>
                )}
                
                {isLocked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 text-red-600">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Account locked • Try again in {formatTime(lockTimer)}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardHeader>

            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Username or Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              {...field}
                              placeholder="Enter your username or email"
                              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                              autoComplete="username"
                              onFocus={() => setFocusedField('username')}
                              onBlur={() => setFocusedField(null)}
                              disabled={isLocked}
                            />
                            <AnimatePresence>
                              {field.value && !errors.username && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                </motion.div>
                              )}
                            </AnimatePresence>
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
                        <FormLabel className="text-sm font-medium text-foreground">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="pl-10 pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary"
                              autoComplete="current-password"
                              onFocus={() => setFocusedField('password')}
                              onBlur={() => setFocusedField(null)}
                              disabled={isLocked}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                              disabled={isLocked}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        
                        {/* Password Strength Indicator */}
                        <AnimatePresence>
                          {focusedField === 'password' && field.value && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-2"
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-muted rounded-full h-1.5">
                                  <motion.div
                                    className={`h-full rounded-full ${
                                      passwordStrength.strength === 1 ? 'bg-red-500' :
                                      passwordStrength.strength === 2 ? 'bg-yellow-500' :
                                      passwordStrength.strength === 3 ? 'bg-green-500' : 'bg-muted'
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                                <span className={`text-xs font-medium ${passwordStrength.color}`}>
                                  {passwordStrength.label}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember Me */}
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <motion.input
                            whileTap={{ scale: 0.95 }}
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                            disabled={isLocked}
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-muted-foreground cursor-pointer">
                          Remember me for 30 days
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <motion.div
                    whileHover={!isLocked ? { scale: 1.02 } : {}}
                    whileTap={!isLocked ? { scale: 0.98 } : {}}
                  >
                    <Button
                      type="submit"
                      className="w-full btn-primary text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-200 group"
                      disabled={loginMutation.isPending || isLocked || !isValid}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Signing In...
                        </>
                      ) : isLocked ? (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Account Locked
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Need Help?</span>
                </div>
              </div>

              {/* Help Options */}
              <div className="space-y-4 text-center">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>For coach access only.</p>
                  <p>Contact admin for account setup or password reset.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="group">
                      Contact Admin
                      <Mail className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="group">
                      Back to Home
                      <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Demo Credentials (for development) */}
              {process.env.NODE_ENV === 'development' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-muted/50 rounded-lg p-4 border border-dashed border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Demo Credentials</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Parent: <code className="bg-background px-1 rounded">parent / password123</code></p>
                    <p>Admin: <code className="bg-background px-1 rounded">admin / password123</code></p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}