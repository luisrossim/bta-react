import { Button } from '@/components/ui/button';
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
    assistanceSchema,
    type Assistance,
    type Order,
} from '@/features/order/types/Order';
import { InputFormItem } from '@/shared/components/inputs-components/InputFormItem';
import { SelectFormItem } from '@/shared/components/inputs-components/SelectFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardCheck, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const tipoEnergia = [
    { value: 1, label: 'Monofásico' },
    { value: 2, label: 'Trifásico' },
];

const polegadasValvulasRegistro = [
    { value: 2, label: '2"' },
    { value: 3, label: '3"' },
    { value: 4, label: '4"' },
];

const diametroAdutoraMestre = [
    { value: '50mm', label: '50mm' },
    { value: '75mm', label: '75mm' },
    { value: '100mm', label: '100mm' },
    { value: '100dff', label: '100dff' },
    { value: '150mmdff', label: '150mmdff' },
];

interface AssistanceFormProps {
    order: Order;
    onSubmit: (values: Assistance) => void;
}

export function AssistanceForm({ order, onSubmit }: AssistanceFormProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<Assistance>({
        resolver: zodResolver(assistanceSchema),
        defaultValues: {
            observacoes: order.observacoes ?? '',
            diametroAdutoraMestre: order.diametroAdutoraMestre ?? '',
            polegadasValvulasRegistro: order.polegadasValvulasRegistro ?? null,
            tipoEnergiaId: order.tipoEnergia?.id ?? null,
            problema: order.problema ?? '',
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                observacoes: order.observacoes ?? '',
                diametroAdutoraMestre: order.diametroAdutoraMestre ?? '',
                polegadasValvulasRegistro:
                    order.polegadasValvulasRegistro ?? null,
                tipoEnergiaId: order.tipoEnergia?.id ?? null,
                problema: order.problema ?? '',
            });
        }
    }, [open, order, form]);

    return (
        <FormProvider {...form}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Button variant='outline'>
                        <ClipboardCheck className='mr-2' /> Ficha de Assistência
                    </Button>
                </SheetTrigger>

                <SheetContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6 h-full flex flex-col justify-between'
                    >
                        <div>
                            <SheetHeader>
                                <SheetTitle>Ficha de Assistência</SheetTitle>
                                <span className='flex items-center gap-1 text-sm text-primary'>
                                    <UserRound size={14} />
                                    {order.cliente.nome}
                                </span>
                            </SheetHeader>

                            <SheetDescription className='grid grid-cols-1 mt-6 gap-4 p-4'>
                                <InputFormItem
                                    name='problema'
                                    label='Qual o problema?'
                                    placeholder='Descreva o problema'
                                />

                                <SelectFormItem
                                    name='tipoEnergiaId'
                                    label='Tipo de Energia'
                                    options={tipoEnergia}
                                    placeholder='Selecionar'
                                />

                                <SelectFormItem
                                    name='polegadasValvulasRegistro'
                                    label='Polegadas das Válvulas de Registro'
                                    options={polegadasValvulasRegistro}
                                    placeholder='Selecionar'
                                />

                                <SelectFormItem
                                    name='diametroAdutoraMestre'
                                    label='Diâmetro da Adutora Mestre'
                                    options={diametroAdutoraMestre}
                                    placeholder='Selecionar'
                                />

                                <InputFormItem
                                    name='observacoes'
                                    label='Observações'
                                    placeholder='Informações adicionais'
                                />
                            </SheetDescription>
                        </div>

                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant='outline' type='button'>
                                    Cancelar
                                </Button>
                            </SheetClose>

                            <Button
                                type='submit'
                                disabled={!form.formState.isDirty}
                            >
                                Salvar
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </FormProvider>
    );
}
