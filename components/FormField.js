import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FormField = React.forwardRef(({ label, type, error, disabled, size, ...props }, ref) => (
  <div>
    <Label htmlFor={props.name} className="mb-2 font-medium text-default-600">
      {label}
    </Label>
    <Input
      {...props}
      type={type}
      ref={ref}
      disabled={disabled}
      size={size}
      className={error ? "border-destructive" : ""}
    />
    {error && <div className="text-destructive mt-2">{error}</div>}
  </div>
));

FormField.displayName = "FormField";

export default FormField;
