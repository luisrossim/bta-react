import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

interface DatePickerFormItemProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    disabledDates?: any;
}

export function DatePickerFormItem<T extends FieldValues>({
    name,
    label,
    placeholder = 'Selecione uma opção',
    disabledDates,
}: DatePickerFormItemProps<T>) {
    const { control } = useFormContext();
    const [open, setOpen] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel className='self-start text-slate-600'>
                        {label}
                    </FormLabel>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant='outline'
                                    data-empty={!field.value}
                                    className='data-[empty=true]:text-muted-foreground justify-start text-left font-normal'
                                >
                                    <CalendarIcon />
                                    {field.value ? (
                                        format(field.value, 'dd/MM/yyyy')
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={(date) => {
                                    field.onChange(date);
                                    setOpen(false);
                                }}
                                disabled={disabledDates}
                            />
                        </PopoverContent>
                    </Popover>

                    {/* <FormMessage /> */}
                </FormItem>
            )}
        />
    );
}
