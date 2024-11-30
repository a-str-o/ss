import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Icon } from "@iconify/react";

const PasswordField = ({ register, error, disabled, size }) => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  return (
    <div>
      <Label htmlFor="password" className="mb-2 font-medium text-default-600">
        Password
      </Label>
      <div className="relative">
        <Input
          id="password"
          type={passwordType}
          {...register("password")}
          disabled={disabled}
          size={size}
          className="peer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
          onClick={togglePasswordType}
        >
          {/* <Icon
            icon={passwordType === "password" ? "heroicons:eye" : "heroicons:eye-slash"}
            className="w-5 h-5 text-default-400"
          /> */}
        </div>
      </div>
      {error && <div className="text-destructive mt-2">{error.message}</div>}
    </div>
  );
};

export default PasswordField;
