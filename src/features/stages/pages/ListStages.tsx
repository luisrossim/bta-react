import type { AssociateForm } from '@/features/stages/types/Stage';
import { PageHeader } from '@/shared/components/PageHeader';
import { AssociatedForm } from '../components/AssociatedForm';
import { AssociatedList } from '../components/AssociatedList';
import { useStageAssociate } from '../hooks/useStageAssociate';

export function ListStages() {
    const { stages, associated, associate, disassociate, disableActions } =
        useStageAssociate();

    const handleAssociateUser = (data: AssociateForm) => {
        associate(data);
    };

    const handleDisassociateUser = (stageId: number, userId: string) => {
        disassociate(stageId, userId);
    };

    return (
        <div className='space-y-14'>
            <PageHeader
                title='Etapas e vinculações'
                subtitle='Vincule usuários às etapas de ordem de serviço para que atuem conforme o fluxo definido.'
                action={
                    <AssociatedForm
                        onAssociate={handleAssociateUser}
                        disableActions={disableActions}
                    />
                }
            />

            <AssociatedList
                stages={stages}
                associated={associated}
                onDisassociate={handleDisassociateUser}
                disableActions={disableActions}
            />
        </div>
    );
}
