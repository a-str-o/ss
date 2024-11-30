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
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SocialButton from "./SocialButton";
import googleIcon from "@/public/images/auth/google.png";
import facebook from "@/public/images/auth/facebook.png";
import apple from "@/public/images/auth/apple.png";
import twitter from "@/public/images/auth/twitter.png";
import { useMediaQuery } from "../hooks/use-media-query";
import { Label } from "./ui/label";
import { supabase } from "../supabaseClient";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});

const RegisterForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    startTransition(async () => {
      const { user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Registration successful! Please check your email for confirmation.");
        reset();
        router.push("/");
      }
    });
  };

  return (
    <div className="w-full">
      <Link href="/dashboard" className="inline-block"></Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Create account to start using DashTail
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div className="space-y-4">
          <InputField
            id="name"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            disabled={isPending}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isPending}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          <PasswordField
            id="password"
            register={register}
            errors={errors}
            disabled={isPending}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>
        <div className="mt-5 flex items-center gap-1.5 mb-8">
          <Checkbox size="sm" className="border-default-300 mt-[1px]" id="terms" />
          <Label
            htmlFor="terms"
            className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
          >
            You accept our Terms & Conditions
          </Label>
        </div>
        <Button className="w-full" disabled={isPending} size={!isDesktop2xl ? "lg" : "md"}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Registering..." : "Create an Account"}
        </Button>
      </form>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <SocialButton icon={googleIcon} altText="Google icon" />
        <SocialButton icon={facebook} altText="Facebook icon" />
        <SocialButton icon={apple} altText="Apple icon" />
        <SocialButton icon={twitter} altText="Twitter icon" />
      </div>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Already Registered?{" "}
        <Link href="/login" className="text-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
