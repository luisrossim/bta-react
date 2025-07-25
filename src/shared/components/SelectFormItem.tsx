import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type Option = { 
   value: any; 
   label: string 
};

interface SelectFormItemProps<T extends FieldValues> {
   name: Path<T>;
   label: string;
   options: Option[];
   placeholder?: string;
}

export function SelectFormItem<T extends FieldValues>({
   name,
   label,
   options,
   placeholder = "Selecionar"
}: SelectFormItemProps<T>) {
   const { control } = useFormContext();
   const [search, setSearch] = useState("");
   const [open, setOpen] = useState(false);

   const filteredOptions = options.filter(option =>
      option.label.toLowerCase().startsWith(search.toLowerCase())
   );

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className="flex flex-col">
               <FormLabel className="self-start text-slate-600">
                  {label}
               </FormLabel>

               <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant="outline"
                           role="combobox"
                           className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                           )}
                        >
                           {field.value
                              ? options.find(
                                 (language) => language.value === field.value
                              )?.label
                              : placeholder
                           }
                           <ChevronsUpDown className="opacity-50" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>

                  <PopoverContent>
                     <Command>
                        <CommandInput
                           placeholder="Pesquisar..."
                           className="h-9"
                           value={search}
                           onValueChange={setSearch}
                        />

                        <CommandList>
                           <CommandEmpty>
                              Nenhum registro encontrado.
                           </CommandEmpty>

                           <CommandGroup>
                              {filteredOptions.map((option) => (
                                 <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                       field.onChange(option.value)
                                       setSearch("");
                                       setOpen(false)
                                    }}
                                 >
                                    {option.label}
                                    <Check
                                       className={cn(
                                          "ml-auto",
                                       option.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                       )}
                                    />
                                 </CommandItem>
                              ))}
                           </CommandGroup>
                        </CommandList>
                     </Command>
                  </PopoverContent>
               </Popover>

               {/* <FormMessage /> */}
            </FormItem>
          )}
        />
   )
}