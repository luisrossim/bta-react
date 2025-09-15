import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useGetCustomersRawQuery } from '@/features/customer/hooks/useCustomerApi';
import type { CustomerRaw } from '@/features/customer/types/Customer';
import { useGetStagesQuery } from '@/features/stages/hooks/useStageApi';
import type { Stage } from '@/features/stages/types/Stage';
import { SelectAsyncFormItem } from '@/shared/components/inputs-components/SelectAsyncFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateOrderMutation } from '../hooks/useOrderApi';
import { createOrderSchema, type CreateOrder } from '../types/Order';

export default function OrderForm() {
    const [openModal, setOpenModal] = useState(false);

    const { isFetching: loadingStages, refetch: getStages } = useGetStagesQuery(
        { enabled: false }
    );

    const { isFetching: loadingCustomersRaw, refetch: getCustomersRaw } =
        useGetCustomersRawQuery({ enabled: false });

    const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

    const form = useForm<CreateOrder>({
        resolver: zodResolver(createOrderSchema),
    });

    const handleOpenChange = (isOpen: boolean) => {
        setOpenModal(isOpen);

        if (isOpen) {
            form.reset();
        }
    };

    const onSubmit = async (data: CreateOrder) => {
        await createOrder(data);
        setOpenModal(false);
    };

    return (
        <FormProvider {...form}>
            <Dialog open={openModal} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus />
                        Nova Ordem
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col justify-between gap-8'
                    >
                        <div className='space-y-6'>
                            <DialogHeader>
                                <DialogTitle>Nova ordem de serviço</DialogTitle>
                            </DialogHeader>

                            <SelectAsyncFormItem
                                label='Etapa'
                                name='etapaId'
                                fetchOptions={getStages}
                                loading={loadingStages}
                                required
                                getOptions={(data) =>
                                    data.map((stage: Stage) => ({
                                        label: stage.descricao,
                                        value: stage.id,
                                    }))
                                }
                            />

                            <SelectAsyncFormItem
                                label='Cliente'
                                name='clienteId'
                                fetchOptions={getCustomersRaw}
                                loading={loadingCustomersRaw}
                                required
                                getOptions={(data) =>
                                    data.map((customer: CustomerRaw) => ({
                                        label: customer.nome,
                                        value: customer.id,
                                    }))
                                }
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='outline'>Cancelar</Button>
                            </DialogClose>
                            <Button disabled={isPending} type='submit'>
                                Cadastrar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
}
