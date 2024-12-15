"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import { useMediaQuery } from "../hooks/use-media-query";
import { Label } from "./ui/label";
import { useAuth } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const RegisterForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const router = useRouter();
  const { signUp } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      startTransition(async () => {
        const { error } = await signUp(data.email, data.password);
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Registration successful! Please check your email to verify your account.");
          router.push('/login');
        }
      });
    } catch (error) {
      toast.error('An error occurred during registration.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold text-default-900 dark:text-default-50 mb-2">
          Create an Account
        </div>
        <div className="text-default-500 dark:text-default-300 text-sm">
          Enter your details to register
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <FormField
          label="Full Name"
          type="text"
          placeholder="Enter your name"
          {...register("name")}
          error={errors.name?.message}
        />

        <FormField
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />

        <PasswordField
          label="Password"
          placeholder="Create a password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link href="#" className="text-primary hover:text-primary/90">
              terms and conditions
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign up"
          )}
        </Button>

        <div className="text-center text-sm text-default-500 dark:text-default-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/90"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
