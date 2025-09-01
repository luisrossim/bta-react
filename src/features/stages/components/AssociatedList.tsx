import { Badge } from '@/components/ui/badge';
import type { AssociatedUsers, Stage } from '@/features/stages/types/Stage';
import { EmptyData } from '@/shared/components/EmptyData';
import { DisassociateForm } from './DisassociateForm';

interface AssociatedListProps {
    stages: Stage[];
    associated: AssociatedUsers[];
    onDisassociate: (stageId: number, userId: string) => void;
    disableActions: boolean;
}

export function AssociatedList({
    stages,
    associated,
    onDisassociate,
    disableActions,
}: AssociatedListProps) {
    if (!stages || !associated) {
        return <EmptyData />;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 my-4'>
            {stages.map((stage, index) => {
                const vinculados = associated.find(
                    (a) => a.stageId === stage.id
                );

                return (
                    <div
                        key={index}
                        className='space-y-4 border min-h-[150px] rounded-lg p-4'
                    >
                        <div className='flex items-center gap-2'>
                            <Badge className='w-[24px] h-[24px]'>
                                {stage.id}
                            </Badge>
                            <h2 className='font-semibold text-sm'>
                                {stage.descricao}
                            </h2>
                        </div>

                        {vinculados && vinculados.users.length > 0 ? (
                            <ul className='grid grid-cols-1 text-sm gap-1'>
                                {vinculados.users.map((user) => (
                                    <li
                                        key={user.id}
                                        className='flex items-center justify-between gap-4'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <DisassociateForm
                                                stage={stage}
                                                user={user}
                                                onSubmit={onDisassociate}
                                                disableActions={disableActions}
                                            />
                                            <span>{user.nome}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-muted-foreground opacity-70 text-sm'>
                                Nenhum usuário vinculado
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
