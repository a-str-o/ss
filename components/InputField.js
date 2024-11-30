import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const InputField = ({ id, label, type, register, errors, disabled, size }) => {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 font-medium text-default-600">
        {label}
      </Label>
      <Input
        disabled={disabled}
        {...register(id)}
        type={type}
        id={id}
        className={cn("", {
          "border-destructive": errors[id],
        })}
        size={size}
      />
      {errors[id] && (
        <div className="text-destructive mt-2 mb-4">
          {errors[id].message}
        </div>
      )}
    </div>
  );
};

export default InputField; 