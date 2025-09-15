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
    associateFormSchema,
    type AssociateForm,
    type Stage,
} from '@/features/stages/types/Stage';
import { useGetUsersQuery } from '@/features/user/hooks/useUserApi';
import type { User } from '@/features/user/types/User';
import { SelectAsyncFormItem } from '@/shared/components/inputs-components/SelectAsyncFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useGetStagesQuery } from '../hooks/useStageApi';

interface AssociatedFormProps {
    onAssociate: (data: AssociateForm) => void;
    disableActions: boolean;
}

export function AssociatedForm({
    onAssociate,
    disableActions,
}: AssociatedFormProps) {
    const [openModal, setOpenModal] = useState(false);

    const { isFetching: loadingStages, refetch: getStages } = useGetStagesQuery(
        { enabled: false }
    );
    const { isFetching: loadingUsers, refetch: getUsers } = useGetUsersQuery({
        enabled: false,
    });

    const form = useForm<AssociateForm>({
        resolver: zodResolver(associateFormSchema),
    });

    const handleOpenChange = (isOpen: boolean) => {
        setOpenModal(isOpen);

        if (isOpen) {
            form.reset();
        }
    };

    const onSubmit = (data: AssociateForm) => {
        setOpenModal(false);
        onAssociate(data);
    };

    return (
        <FormProvider {...form}>
            <Dialog open={openModal} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button>
                        <Link />
                        Vincular
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <DialogHeader>
                            <DialogTitle>Vincular usuário</DialogTitle>
                            <DialogDescription>
                                Essa ação facilitará a atribuição do mesmo no
                                gerenciamento de ordens de serviço.
                            </DialogDescription>
                        </DialogHeader>

                        <SelectAsyncFormItem
                            label='Usuário'
                            name='userId'
                            fetchOptions={getUsers}
                            loading={loadingUsers}
                            required
                            getOptions={(data) =>
                                data.map((user: User) => ({
                                    label: user.nome,
                                    value: user.id,
                                }))
                            }
                        />

                        <SelectAsyncFormItem
                            label='Etapa'
                            name='stageId'
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

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='outline'>Cancelar</Button>
                            </DialogClose>
                            <Button disabled={disableActions} type='submit'>
                                Vincular
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
}
