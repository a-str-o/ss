"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { useMediaQuery } from "../hooks/use-media-query";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import RememberMeAndForgotPassword from "./RememberMeAndForgotPassword";
import Link from "next/link";
import  SiteLogo  from "./svg/SiteLogo";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { supabase } from '../supabaseClient'; // Adjust the path as necessary

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "example@example.com",
      password: "password",
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      console.error('Login error:', error.message);
    } else {
      console.log('User logged in:', user);
    }
  };

  return (
    <div className="w-full py-10">
      <Link href="/dashboard" className="inline-block">
        <SiteLogo className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary" />
      </Link>
      <h1 className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        SMM
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <FormField
          label="Email"
          id="email"
          register={register}
          error={errors.email}
          disabled={isPending}
          type="email"
          size={!isDesktop2xl ? "xl" : "lg"}
        />
        <PasswordField
          register={register}
          error={errors.password}
          disabled={isPending}
          size={!isDesktop2xl ? "xl" : "lg"}
        />
        <RememberMeAndForgotPassword />
        <Button className="w-full" disabled={isPending} onClick={handleSubmit(onSubmit)}>
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
