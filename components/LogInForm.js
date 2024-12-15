"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock } from 'react-icons/fi';

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LogInForm = () => {
  const router = useRouter();
  const { signIn, user, loading } = useAuth();
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const onSubmit = async (data) => {
    try {
      startTransition(async () => {
        const { error } = await signIn(data.email, data.password);
        if (error) {
          console.error('Login error:', error);
        }
      });
    } catch (error) {
      console.error('Form error:', error);
      toast.error('An unexpected error occurred during login.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FiMail className="h-5 w-5" />
            </div>
            <FormField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email}
              {...register("email")}
              className="pl-10 w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FiLock className="h-5 w-5" />
            </div>
            <PasswordField
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              {...register("password")}
              className="pl-10 w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 border-2 border-gray-300 rounded text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Don&apos;t have an account?
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/register"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Create a free account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
