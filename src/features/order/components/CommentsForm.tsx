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
import {
    commentsHistorySchema,
    type CommentsHistory,
} from '@/features/order/types/OrderHistory';
import { TextAreaFormItem } from '@/shared/components/inputs-components/TextAreaFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface CommentsFormProps {
    observacoes?: string;
    onSubmit: (values: CommentsHistory) => void;
}

export function CommentsForm({ observacoes, onSubmit }: CommentsFormProps) {
    const [openModal, setOpenModal] = useState(false);

    const form = useForm<CommentsHistory>({
        resolver: zodResolver(commentsHistorySchema),
        defaultValues: { observacoes },
    });

    const handleOpenChange = (isOpen: boolean) => {
        setOpenModal(isOpen);

        if (isOpen) {
            form.reset({ observacoes });
        }
    };

    const handleSubmit = async (values: CommentsHistory) => {
        onSubmit(values);
        setOpenModal(false);
    };

    return (
        <FormProvider {...form}>
            <Dialog open={openModal} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button variant='ghost' size='icon'>
                        <Edit className='text-primary' />
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='flex flex-col justify-between gap-8'
                    >
                        <div className='space-y-6'>
                            <DialogHeader>
                                <DialogTitle>
                                    Editar observações da etapa
                                </DialogTitle>
                            </DialogHeader>

                            <TextAreaFormItem
                                label='Observações'
                                name='observacoes'
                                className='min-h-[100px] rounded-[12px] text-sm'
                                required
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='outline'>Cancelar</Button>
                            </DialogClose>
                            <Button type='submit'>Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
}
