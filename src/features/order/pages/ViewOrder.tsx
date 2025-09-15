import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/features/auth/contexts/AuthContext';
import { useOrderInfo } from '@/features/order/hooks/useOrderInfo';
import { DisassociateForm } from '@/features/stages/components/DisassociateForm';
import { AccordionList } from '@/shared/components/AccordionList';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { EmptyData } from '@/shared/components/EmptyData';
import { LoadingIcon } from '@/shared/components/LoadingIcon';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { formatTelefone } from '@/shared/utils/formatTelephone';
import {
    ArrowRight,
    Check,
    CircleCheck,
    Clock,
    Eye,
    Phone,
    UserRound,
    UserRoundCheck,
    Waypoints,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AssignUserForm } from '../components/AssignUserForm';
import { AttachmentForm } from '../components/Attachment/AttachmentForm';
import { AttachmentList } from '../components/Attachment/AttachmentList';
import { CommentsForm } from '../components/CommentsForm';
import { OrderHistoryModal } from '../components/OrderHistoryModal';
import { OrderSheets } from '../components/OrderSheets';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import {
    useAdvanceMutation,
    useCommentsMutation,
    useConcludeMutation,
    useSelfAssignMutation,
    useUploadFileMutation,
    useUserAssignMutation,
    useUserDisassociateMutation,
} from '../hooks/useOrderApi';
import { useOrderDetails } from '../hooks/useOrderDetails';
import { orderService } from '../services/orderService';

export default function ViewOrder() {
    const { isAdmin, userLogged } = useAuthContext();
    const { calculateExecutionTime } = useOrderDetails();
    const navigate = useNavigate();

    const { mutate: assign } = useUserAssignMutation();
    const { mutate: selfAssign } = useSelfAssignMutation();
    const { mutate: disassociate } = useUserDisassociateMutation();
    const { mutate: conclude } = useConcludeMutation();
    const { mutate: advance } = useAdvanceMutation();
    const { mutate: comments } = useCommentsMutation();
    const { mutate: uploadFile, isPending: isUploading } =
        useUploadFileMutation();

    const { order, currentOrder, pastOrders, orderIsCompleted, isFetching } =
        useOrderInfo();

    if (isFetching) return <LoadingIcon />;

    if (!order || !currentOrder) return <EmptyData />;

    const handleUploadFile = (file: FormData) => {
        uploadFile({
            orderId: order.id,
            file,
        });
    };

    const handleViewAttachment = async (attachmentId: string) => {
        const attachment = await orderService.viewAttachment(attachmentId);

        if (attachment) {
            window.open(attachment.url_temporaria, '_blank');
        }
    };

    return (
        <div className='space-y-10'>
            <div className='flex flex-wrap justify-between items-start gap-10'>
                <div className='flex lg:items-center flex-col lg:flex-row gap-2 lg:gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-xl md:text-2xl font-semibold'>
                                OS #{order.numero}
                            </h1>

                            <OrderStatusBadge
                                completedDate={currentOrder.concluidoEm}
                            />
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Iniciada em {formatTimestamp(currentOrder.criadoEm)}
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-4 flex-wrap'>
                    <OrderSheets
                        order={order}
                        stage={currentOrder.etapa.descricao}
                    />

                    {!currentOrder.concluidoEm ? (
                        <ConfirmDialog
                            onConfirm={() => conclude(currentOrder.id)}
                            title='Concluir etapa?'
                            trigger={
                                <Button>
                                    <Check />
                                    Concluir
                                </Button>
                            }
                        />
                    ) : (
                        <ConfirmDialog
                            onConfirm={() => advance(currentOrder.id)}
                            title='Avançar etapa?'
                            trigger={
                                <Button disabled={!isAdmin}>
                                    <ArrowRight /> Avançar
                                </Button>
                            }
                        />
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4'>
                <div className='space-y-6'>
                    <AccordionList title='Etapa atual' collapsible={false}>
                        <p className='flex items-center gap-2 text-primary'>
                            <Waypoints size={16} />{' '}
                            {currentOrder.etapa.descricao}
                        </p>
                    </AccordionList>

                    <AccordionList title='Cliente' collapsible={false}>
                        <div className='grid grid-cols-1 gap-2'>
                            <div className='flex items-center gap-2'>
                                <UserRound size={16} />
                                {order.cliente.nome}
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() =>
                                        navigate(
                                            `/sistema/clientes/${order.cliente.id}`
                                        )
                                    }
                                >
                                    <Eye className='text-primary' />
                                </Button>
                            </div>
                            <a
                                href={`tel:${order.cliente.telefone}`}
                                className='flex items-center gap-2 '
                            >
                                <Phone size={16} />
                                {formatTelefone(order.cliente.telefone)}
                            </a>
                        </div>
                    </AccordionList>

                    <AccordionList title='Técnicos atribuídos'>
                        <div>
                            {currentOrder.atribuicoes.length > 0 &&
                                currentOrder.atribuicoes?.map(
                                    ({ usuario }, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center gap-2 mb-2'
                                        >
                                            <DisassociateForm
                                                key={usuario.id}
                                                title='Desatribuir usuário?'
                                                stage={currentOrder.etapa}
                                                user={usuario}
                                                onSubmit={() =>
                                                    disassociate({
                                                        historyId:
                                                            currentOrder.id,
                                                        userId: usuario.id,
                                                    })
                                                }
                                            />
                                            <span>{usuario.nome}</span>
                                        </div>
                                    )
                                )}

                            {isAdmin && (
                                <AssignUserForm
                                    stageUsers={currentOrder.etapa.etapaUsuario}
                                    onAssign={(userId) =>
                                        assign({
                                            historyId: currentOrder.id,
                                            userId,
                                        })
                                    }
                                />
                            )}

                            {!isAdmin &&
                                !currentOrder.atribuicoes.some(
                                    (attr) => attr.usuario.id == userLogged?.id
                                ) && (
                                    <ConfirmDialog
                                        onConfirm={() => {
                                            selfAssign({
                                                historyId: currentOrder.id,
                                                userId: userLogged!.id,
                                            });
                                        }}
                                        disabled={false}
                                        title={'Auto atribuição'}
                                        confirmLabel='Confirmar'
                                        description={`Deseja se auto atribuir nessa ordem de serviço?`}
                                        trigger={
                                            <Button size={'sm'}>
                                                Auto atribuir
                                            </Button>
                                        }
                                    />
                                )}
                        </div>
                    </AccordionList>

                    <AccordionList title='Informações de progresso'>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-2'>
                                <Clock
                                    size={17}
                                    className={`${orderIsCompleted ? 'bg-green-500' : 'bg-amber-600'} rounded-full text-white`}
                                />
                                Tempo de execução:
                                <span>
                                    {calculateExecutionTime(
                                        currentOrder.criadoEm,
                                        currentOrder.concluidoEm!
                                    )}
                                </span>
                            </div>

                            <div
                                className={`flex items-center gap-2 ${!orderIsCompleted && 'opacity-60'}`}
                            >
                                <CircleCheck
                                    size={17}
                                    className={`${orderIsCompleted ? 'bg-green-500' : 'bg-muted-foreground'} rounded-full text-white`}
                                />
                                Concluída em:
                                <span>
                                    {formatTimestamp(currentOrder.concluidoEm)}
                                </span>
                            </div>

                            <div
                                className={`flex items-center gap-2 ${!orderIsCompleted && 'opacity-60'}`}
                            >
                                <UserRoundCheck size={17} />
                                Responsável:
                                <span>{currentOrder.concluidoPor?.nome}</span>
                            </div>
                        </div>
                    </AccordionList>

                    <AccordionList title='Observações'>
                        <div className='flex items-center gap-2'>
                            <p>
                                {currentOrder.observacoes ?? 'Sem observações'}
                            </p>

                            <CommentsForm
                                key={currentOrder.id}
                                observacoes={currentOrder.observacoes}
                                onSubmit={(values) =>
                                    comments({
                                        historyId: currentOrder.id,
                                        values,
                                    })
                                }
                            />
                        </div>
                    </AccordionList>
                </div>

                <aside className='space-y-6'>
                    <AccordionList title='Anexos'>
                        <AttachmentList
                            attachments={order.anexos ?? []}
                            onRequest={handleViewAttachment}
                        />
                        <AttachmentForm
                            onSubmit={handleUploadFile}
                            isUploading={isUploading}
                        />
                    </AccordionList>

                    <AccordionList title='Histórico'>
                        <OrderHistoryModal
                            order={order}
                            pastOrders={pastOrders}
                        />
                    </AccordionList>
                </aside>
            </div>
        </div>
    );
}
