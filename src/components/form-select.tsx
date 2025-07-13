import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Option = { value: any; label: string };

interface FormSelectProps<T extends FieldValues> {
   name: Path<T>;
   control: Control<T>;
   label: string;
   options: Option[];
   placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
   name,
   control,
   label,
   options,
   placeholder
}: FormSelectProps<T>) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => (
         <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
               <Select onValueChange={field.onChange} value={field.value?.toString() || ""}>
               <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder || ""} />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                           {opt.label}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
               </Select>
            </FormControl>
         </FormItem>
         )}
      />
   )
}