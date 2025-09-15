import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

interface InputFormItemProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export function InputFormItem<T extends FieldValues>({
    name,
    label,
    type = 'text',
    placeholder,
    disabled = false,
    required = false,
    className,
}: InputFormItemProps<T>) {
    const { control } = useFormContext();

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

                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={cn('w-full', className)}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
