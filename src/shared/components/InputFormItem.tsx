import { Input } from "@/components/ui/input";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputFormItemProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function InputFormItem<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  className,
}: InputFormItemProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cn("w-full", className)}
            />
          </FormControl>
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
