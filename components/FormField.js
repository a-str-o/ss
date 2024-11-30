import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FormField = ({ label, id, register, error, disabled, type, size }) => (
  <div>
    <Label htmlFor={id} className="mb-2 font-medium text-default-600">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      {...register(id)}
      disabled={disabled}
      size={size}
      className={error ? "border-destructive" : ""}
    />
    {error && <div className="text-destructive mt-2">{error.message}</div>}
  </div>
);

export default FormField;
