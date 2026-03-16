"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Eye, EyeOff, CheckCircle, Sparkles } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import toast from "react-hot-toast";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Min 8 characters").regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Must include letters and numbers"),
  agreeToTerms: z.boolean().refine(v => v, "You must agree to the terms"),
});
type SignupFormData = z.infer<typeof signupSchema>;

const benefits = ["14-day free trial, no credit card", "10 specialized AI agents", "24/7 availability", "Cancel anytime"];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");
  const strength = [/.{8,}/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-emerald-400", "bg-emerald-500"][strength];

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data.name, data.email, data.password);
      toast.success("Account created! Welcome to AssistAI 🎉");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 grid-pattern flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-600/8 blur-[100px]" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-glow-blue">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Assist<span className="text-gradient">AI</span></span>
        </Link>

        <div className="card p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-navy-400 text-sm mb-6">Start your 14-day free trial today</p>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-1.5 text-xs text-navy-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input {...register("name")} className="input" placeholder="Jane Smith" autoComplete="name" />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label">Email</label>
              <input {...register("email")} className="input" placeholder="jane@company.com" type="email" autoComplete="email" />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input {...register("password")} className="input pr-10" placeholder="Min 8 chars, letters + numbers" type={showPassword ? "text" : "password"} autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColor : "bg-navy-700"} transition-all`} />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${strength >= 3 ? "text-emerald-400" : "text-amber-400"}`}>{strengthLabel}</p>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-start gap-2">
              <input {...register("agreeToTerms")} type="checkbox" id="terms" className="mt-0.5 accent-primary-500" />
              <label htmlFor="terms" className="text-xs text-navy-400 cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-primary-400 hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary-400 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-xs text-red-400">{errors.agreeToTerms.message}</p>}

            <button type="submit" disabled={isLoading} className="btn btn-primary w-full justify-center">
              {isLoading ? (
                <><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></>
              ) : (
                <><Sparkles className="w-4 h-4" /> Create Account & Start Free Trial</>
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-navy-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
