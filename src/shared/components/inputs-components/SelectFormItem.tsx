import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Option = {
    value: any;
    label: string;
};

interface SelectFormItemProps {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    allowClear?: boolean;
    required?: boolean;
}

export function SelectFormItem({
    name,
    label,
    options,
    placeholder = 'Selecione uma opção',
    allowClear = true,
    required = false,
}: SelectFormItemProps) {
    const { control } = useFormContext();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().startsWith(search.toLowerCase())
    );

    const hasValue = (fieldValue: any) => !!fieldValue;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel className='flex items-center gap-1'>
                        {label}
                        {required && <span style={{ color: 'red' }}>*</span>}
                    </FormLabel>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                        'w-full justify-between',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    {field.value
                                        ? options.find(
                                              (language) =>
                                                  language.value === field.value
                                          )?.label
                                        : placeholder}
                                    <ChevronsUpDown className='opacity-50' />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            <Command>
                                <CommandInput
                                    placeholder='Pesquisar...'
                                    className='h-9'
                                    value={search}
                                    onValueChange={setSearch}
                                    autoFocus={false}
                                />

                                {allowClear && hasValue(field.value) && (
                                    <Button
                                        type='button'
                                        variant='secondary'
                                        size='sm'
                                        className='w-full my-2'
                                        onClick={() => {
                                            field.onChange(null);
                                            setSearch('');
                                            setOpen(false);
                                        }}
                                    >
                                        Limpar seleção
                                    </Button>
                                )}

                                <CommandList>
                                    <CommandEmpty>
                                        Nenhum registro encontrado.
                                    </CommandEmpty>

                                    <CommandGroup>
                                        {filteredOptions.map(
                                            (option, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={option.label}
                                                    onSelect={() => {
                                                        field.onChange(
                                                            option.value
                                                        );
                                                        setSearch('');
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {option.label}
                                                    <Check
                                                        className={cn(
                                                            'ml-auto',
                                                            option.value ===
                                                                field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                </CommandItem>
                                            )
                                        )}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {/* <FormMessage /> */}
                </FormItem>
            )}
        />
    );
}
