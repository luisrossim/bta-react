import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface MaskFormItemProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  format: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MaskFormItem<T extends FieldValues>({
  name,
  label,
  format,
  placeholder,
  disabled = false,
  className,
}: MaskFormItemProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="self-start text-slate-600">{label}</FormLabel>
          <FormControl>
            <PatternFormat
              value={field.value ?? ""}
              format={format}
              disabled={disabled}
              placeholder={placeholder}
              className={className}
              onValueChange={(values) => field.onChange(values.value)}
              customInput={Input}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

