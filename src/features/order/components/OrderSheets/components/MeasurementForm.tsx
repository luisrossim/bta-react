import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    measurementSchema,
    type Measurement,
    type Order,
} from '@/features/order/types/Order';
import { InputFormItem } from '@/shared/components/inputs-components/InputFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

interface MeasurementFormProps {
    order: Order;
    onSubmit: (values: Measurement) => void;
}

export function MeasurementForm({ order, onSubmit }: MeasurementFormProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<Measurement>({
        resolver: zodResolver(measurementSchema),
        defaultValues: {
            hasAutomacao: order.hasAutomacao,
            hasOrcamentoBanco: order.hasOrcamentoBanco,
            hasProjetoPlantio: order.hasProjetoPlantio,
            quantidadeSetores: order.quantidadeSetores,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                hasAutomacao: order.hasAutomacao,
                hasOrcamentoBanco: order.hasOrcamentoBanco,
                hasProjetoPlantio: order.hasProjetoPlantio,
                quantidadeSetores: order.quantidadeSetores,
            });
        }
    }, [open, order, form]);

    return (
        <FormProvider {...form}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Button variant='outline'>
                        <ClipboardCheck className='mr-2' /> Ficha de Medição
                    </Button>
                </SheetTrigger>

                <SheetContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6 h-full flex flex-col justify-between'
                    >
                        <div>
                            <SheetHeader>
                                <SheetTitle>Ficha de Medição</SheetTitle>
                                <SheetDescription className='flex items-center gap-1 text-sm text-muted-foreground'>
                                    Preencha as informações abaixo:
                                </SheetDescription>
                            </SheetHeader>

                            <div className='grid grid-cols-1 mt-6 gap-4 p-4'>
                                <div className='flex items-center space-x-2'>
                                    <Controller
                                        name='hasAutomacao'
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <Checkbox
                                                    id='hasAutomacao'
                                                    checked={
                                                        field.value ?? false
                                                    }
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />

                                                <Label htmlFor='hasAutomacao'>
                                                    Automação
                                                </Label>
                                            </>
                                        )}
                                    />
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <Controller
                                        name='hasProjetoPlantio'
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <Checkbox
                                                    id='hasProjetoPlantio'
                                                    checked={
                                                        field.value ?? false
                                                    }
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />

                                                <Label htmlFor='hasProjetoPlantio'>
                                                    Projeto para Plantio
                                                </Label>
                                            </>
                                        )}
                                    />
                                </div>

                                <div className='flex items-center space-x-2 mb-4'>
                                    <Controller
                                        name='hasOrcamentoBanco'
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <Checkbox
                                                    id='hasOrcamentoBanco'
                                                    checked={
                                                        field.value ?? false
                                                    }
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />

                                                <Label htmlFor='hasOrcamentoBanco'>
                                                    Orçamento para Investimento
                                                    (Banco)
                                                </Label>
                                            </>
                                        )}
                                    />
                                </div>

                                <InputFormItem
                                    label='Quantidade de Setores'
                                    name='quantidadeSetores'
                                    type='number'
                                />
                            </div>
                        </div>

                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant='outline' type='button'>
                                    Cancelar
                                </Button>
                            </SheetClose>

                            {form.formState.isDirty && (
                                <Button type='submit'>Salvar</Button>
                            )}
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </FormProvider>
    );
}
