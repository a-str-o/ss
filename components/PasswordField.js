import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';

const PasswordField = React.forwardRef(({ label, error, disabled, size, ...props }, ref) => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  return (
    <div>
      <Label htmlFor={props.name} className="mb-2 font-medium text-default-600">
        {label}
      </Label>
      <div className="relative">
        <Input
          {...props}
          type={passwordType}
          ref={ref}
          disabled={disabled}
          size={size}
          className={`peer ${error ? "border-destructive" : ""}`}
        />
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
          onClick={togglePasswordType}
        >
          {passwordType === "password" ? (
            <Eye className="h-4 w-4 text-default-400" />
          ) : (
            <EyeOff className="h-4 w-4 text-default-400" />
          )}
        </button>
      </div>
      {error && <div className="text-destructive mt-2">{error}</div>}
    </div>
  );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;
