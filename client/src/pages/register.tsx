import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UserPlus, Eye, EyeOff, Trophy, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email"),
  parentName: z.string().min(2, "Parent name is required"),
  studentName: z.string().min(2, "Student name is required"),
  studentAge: z.string().min(1, "Student age is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone is required"),
  gdprConsent: z.boolean().refine(val => val === true, "GDPR consent is required"),
  dataProcessingConsent: z.boolean().refine(val => val === true, "Data processing consent is required"),
  marketingConsent: z.boolean().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      parentName: "",
      studentName: "",
      studentAge: "",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      gdprConsent: false,
      dataProcessingConsent: false,
      marketingConsent: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) =>
      apiRequest("POST", "/api/auth/register", {
        ...data,
        studentAge: parseInt(data.studentAge),
        role: "parent",
      }),
    onSuccess: (response: any) => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to One For All Coaching. You can now log in.",
      });
      localStorage.setItem("user", JSON.stringify(response.user));
      setLocation("/parent-dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-almost-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-lfc-red hover:text-bright-red mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-lfc-red mr-2" />
            <h1 className="text-3xl font-bold text-white">ONE FOR ALL COACHING</h1>
          </div>
          <p className="text-gray-400">Create your parent account to track your child's progress</p>
        </div>

        <Card className="bg-almost-black border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">
              <UserPlus className="w-6 h-6 inline-block mr-2" />
              Parent Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Account Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-black border-gray-600 text-white focus:border-lfc-red"
                              placeholder="Choose a username"
                            />
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
                          <FormLabel className="text-white">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                className="bg-black border-gray-600 text-white focus:border-lfc-red pr-10"
                                placeholder="Create a password"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-black border-gray-600 text-white focus:border-lfc-red"
                            placeholder="your.email@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Parent & Student Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Parent & Student Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Parent/Guardian Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-black border-gray-600 text-white focus:border-lfc-red"
                              placeholder="Your full name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-black border-gray-600 text-white focus:border-lfc-red"
                              placeholder="07123 456789"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="studentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Student Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-black border-gray-600 text-white focus:border-lfc-red"
                              placeholder="Your child's name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studentAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Student Age</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="5"
                              max="18"
                              className="bg-black border-gray-600 text-white focus:border-lfc-red"
                              placeholder="Age"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Emergency Contact
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Emergency Contact Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-black border-gray-600 text-white focus:border-lfc-red"
                              placeholder="Emergency contact name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Emergency Contact Phone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-black border-gray-600 text-white focus:border-lfc-red"
                              placeholder="07123 456789"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* GDPR Consent Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Privacy & Data Protection
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="gdprConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">
                            GDPR Compliance Consent (Required) *
                          </FormLabel>
                          <p className="text-gray-400 text-sm">
                            I consent to the processing of my personal data in accordance with GDPR regulations for the purpose of providing coaching services. This includes storing contact details, student information, and session records.
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataProcessingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">
                            Data Processing Consent (Required) *
                          </FormLabel>
                          <p className="text-gray-400 text-sm">
                            I consent to the processing of my data for session management, progress tracking, payment processing, and communication about sessions.
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marketingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">
                            Marketing Communications (Optional)
                          </FormLabel>
                          <p className="text-gray-400 text-sm">
                            I would like to receive marketing communications about new services, promotions, and coaching tips. You can withdraw this consent at any time.
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="bg-black p-4 rounded-lg">
                    <p className="text-gray-400 text-xs">
                      <strong>Your Rights:</strong> You have the right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data. You can withdraw consent at any time. For privacy concerns, contact privacy@all-4one-coaching.com
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lfc-red hover:bg-bright-red text-white py-3"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Creating Account..." : "Create Parent Account"}
                </Button>

                <div className="text-center text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-lfc-red hover:text-bright-red">
                    Sign in here
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}