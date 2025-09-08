import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

interface TextAreaFormItemProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export function TextAreaFormItem<T extends FieldValues>({
    name,
    label,
    placeholder,
    disabled = false,
    required = false,
    className,
}: TextAreaFormItemProps<T>) {
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
                        <Textarea
                            placeholder={placeholder}
                            disabled={disabled}
                            className={cn('w-full', className)}
                            {...field}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
