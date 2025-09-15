import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type {
    Atribuicao,
    OrderHistory,
} from '@/features/order/types/OrderHistory';
import { StageHeader } from '@/features/stages/components/StageHeader';
import type { User } from '@/features/user/types/User';
import { EmptyData } from '@/shared/components/EmptyData';
import { ListItem } from '@/shared/components/ListItem';
import { formatBoolean } from '@/shared/utils/formatBoolean';
import { formatTimestamp } from '@/shared/utils/formatDate';
import type { Order } from '../types/Order';
import { UsersAssigned } from './UsersAssigned';

interface OrderHistoryModalProps {
    order: Order;
    pastOrders: OrderHistory[];
}

export function OrderHistoryModal({
    order,
    pastOrders,
}: OrderHistoryModalProps) {
    if (!pastOrders || pastOrders.length === 0) {
        return <EmptyData />;
    }

    const getUsersAssigned = (atribuicoes: Atribuicao[]) => {
        return atribuicoes.map((atr) => ({
            id: atr.usuario.id,
            nome: atr.usuario.nome,
        }));
    };

    const getUserWhoCompleted = (user: User) => {
        return [
            {
                id: user.id,
                nome: user.nome,
            },
        ];
    };

    return (
        <>
            {pastOrders.map((item, index) => (
                <Dialog key={index}>
                    <DialogTrigger asChild>
                        <button className='w-full text-left hover:bg-accent transition mb-2 p-1 rounded-sm'>
                            <StageHeader stage={item.etapa} />
                        </button>
                    </DialogTrigger>

                    <DialogContent className='sm:max-w-6xl'>
                        <DialogHeader>
                            <DialogTitle>
                                {item.etapa.id} - {item.etapa.descricao}
                            </DialogTitle>
                        </DialogHeader>

                        <div className='mt-2'>
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5'>
                                <ListItem
                                    label='Técnicos atribuídos'
                                    value={
                                        <UsersAssigned
                                            users={getUsersAssigned(
                                                item.atribuicoes
                                            )}
                                        />
                                    }
                                />

                                <ListItem
                                    label='Concluída por'
                                    value={
                                        <UsersAssigned
                                            users={getUserWhoCompleted(
                                                item.concluidoPor
                                            )}
                                        />
                                    }
                                />

                                {item.etapa.descricao === 'Medição' && (
                                    <>
                                        <ListItem
                                            label='Automação'
                                            value={formatBoolean(
                                                order.hasAutomacao
                                            )}
                                        />
                                        <ListItem
                                            label='Orçamento para Investimento (Banco)'
                                            value={formatBoolean(
                                                order.hasOrcamentoBanco
                                            )}
                                        />
                                        <ListItem
                                            label='Projeto para Plantio'
                                            value={formatBoolean(
                                                order.hasProjetoPlantio
                                            )}
                                        />
                                        <ListItem
                                            label='Quantidade de Setores'
                                            value={
                                                order.quantidadeSetores ??
                                                'Não informado'
                                            }
                                        />
                                    </>
                                )}

                                <ListItem
                                    label='Iniciada em'
                                    value={formatTimestamp(item.criadoEm)}
                                />

                                <ListItem
                                    label='Concluída em'
                                    value={formatTimestamp(item.concluidoEm)}
                                />
                            </div>

                            <ListItem
                                label='Observações'
                                value={item.observacoes ?? 'Sem observações'}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </>
    );
}
