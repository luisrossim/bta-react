import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

interface MaskFormItemProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    format: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export function MaskFormItem<T extends FieldValues>({
    name,
    label,
    format,
    placeholder,
    disabled = false,
    required = false,
    className,
}: MaskFormItemProps<T>) {
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
                        <PatternFormat
                            value={field.value ?? ''}
                            format={format}
                            disabled={disabled}
                            placeholder={placeholder}
                            className={className}
                            onValueChange={(values) =>
                                field.onChange(values.value)
                            }
                            customInput={Input}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
