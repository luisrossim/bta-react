import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useFormContext, type FieldValues, type Path } from "react-hook-form"
import { InputMasked } from "./InputMasked"
import { cn } from "@/lib/utils"

interface InputFormItemProps<T extends FieldValues> {
  name: Path<T>
  label: string
  type?: string
  maskFormat?: string
  maskPlaceholder?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function InputFormItem<T extends FieldValues>({
  name,
  label,
  type = "text",
  maskFormat,
  maskPlaceholder,
  placeholder,
  disabled = false,
  className
}: InputFormItemProps<T>) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="self-start text-neutral-600">
            {label}
          </FormLabel>

          <FormControl>
            {maskFormat ? (
              <InputMasked
                value={field.value ?? ""}
                format={maskFormat}
                disabled={disabled}
                placeholder={maskPlaceholder}
                className="w-full"
                onValueChange={(values) => field.onChange(values.value)}
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={cn("w-full", className)}
              />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
