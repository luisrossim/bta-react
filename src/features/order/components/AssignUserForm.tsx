import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    createAtribuicaoSchema,
    type CreateAtribuicao,
} from '@/features/order/types/OrderHistory';
import type { StageUser } from '@/features/stages/types/Stage';
import { SelectFormItem } from '@/shared/components/inputs-components/SelectFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface AssignUserFormProps {
    stageUsers: StageUser[];
    onAssign: (userId: string) => void;
}

export function AssignUserForm({ stageUsers, onAssign }: AssignUserFormProps) {
    const [openModal, setOpenModal] = useState(false);

    const form = useForm<CreateAtribuicao>({
        resolver: zodResolver(createAtribuicaoSchema),
    });

    const handleOpenChange = (isOpen: boolean) => {
        setOpenModal(isOpen);

        if (isOpen) {
            form.reset();
        }
    };

    const onSubmit = ({ userId }: CreateAtribuicao) => {
        setOpenModal(false);
        onAssign(userId);
    };

    const stageUsersOptions = useMemo(
        () =>
            stageUsers.map((option) => ({
                value: option.usuario.id,
                label: option.usuario.nome,
            })),
        [stageUsers]
    );

    return (
        <FormProvider {...form}>
            <Dialog open={openModal} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button variant='secondary' size='sm'>
                        <UserPlus /> Atribuir
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <DialogHeader>
                            <DialogTitle>Atribuir usuário</DialogTitle>
                            <DialogDescription>
                                O usuário atribuído poderá realizar ações nessa
                                etapa
                            </DialogDescription>
                        </DialogHeader>

                        <SelectFormItem
                            label='Usuário'
                            name='userId'
                            options={stageUsersOptions}
                            required
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='outline'>Cancelar</Button>
                            </DialogClose>
                            <Button type='submit'>Atribuir</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
}
