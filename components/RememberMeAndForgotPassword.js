import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const RememberMeAndForgotPassword = () => (
  <div className="mt-5 mb-8 flex flex-wrap gap-2">
    <div className="flex-1 flex items-center gap-1.5">
      <Checkbox
        size="sm"
        className="border-default-300 mt-[1px]"
        id="isRemembered"
      />
      <Label
        htmlFor="isRemembered"
        className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
      >
        Remember me
      </Label>
    </div>
    <Link href="/forgot" className="flex-none text-sm text-primary">
      Forgot Password?
    </Link>
  </div>
);

export default RememberMeAndForgotPassword;
