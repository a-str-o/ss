"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";
import SiteLogo from "./svg/SiteLogo";

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
});

const ForgotForm = () => {
  const [isPending, startTransition] = React.useTransition();
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
      const { error } = await supabase.auth.resetPasswordForEmail(data.email);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset code has been sent to your email");
        reset();
        router.push("/auth/create-password2");
      }
    });
  };

  return (
    <div className="w-full">
      <Link href="/dashboard" className="inline-block">
        <SiteLogo className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary" />
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Forget Your Password?
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter your email & instructions will be sent to you!
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            Email{" "}
          </Label>
          <Input
            disabled={isPending}
            {...register("email")}
            type="email"
            id="email"
            className={cn("", {
              "border-destructive": errors.email,
            })}
          />
        </div>
        {errors.email && (
          <div className="text-destructive mt-2">{errors.email.message}</div>
        )}

        <Button className="w-full mt-6">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "sending..." : "Send Recovery Email"}
        </Button>
      </form>
      <div className="mt-8 text-center text-base text-default-600">
        Forget it. Send me back to{" "}
        <Link href="/login" className="text-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotForm;
