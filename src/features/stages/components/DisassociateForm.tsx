import { Button } from '@/components/ui/button';
import type { Stage } from '@/features/stages/types/Stage';
import type { User } from '@/features/user/types/User';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { Link, Link2Off } from 'lucide-react';

interface DisassociateFormProps {
    title?: string;
    stage: Stage;
    user: Partial<User>;
    onSubmit: (stageId: number, userId: string) => void;
    disableActions?: boolean;
}

export function DisassociateForm({
    stage,
    user,
    onSubmit,
    disableActions = false,
    title = 'Desvincular usuário?',
}: DisassociateFormProps) {
    const handleConfirm = () => {
        onSubmit(stage.id, user.id!);
    };

    return (
        <ConfirmDialog
            onConfirm={handleConfirm}
            disabled={disableActions}
            title={title}
            description={`Deseja remover o vínculo de "${user.nome}" da etapa "${stage.descricao}"?`}
            trigger={
                <Button
                    variant='link'
                    size='icon'
                    className='group relative w-[24px] h-[24px]'
                >
                    <Link className='text-primary group-hover:hidden' />
                    <Link2Off className='text-red-600 hidden group-hover:block' />
                </Button>
            }
        />
    );
}
