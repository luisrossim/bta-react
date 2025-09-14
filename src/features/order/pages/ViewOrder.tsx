import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/features/auth/contexts/AuthContext';
import { useOrderInfo } from '@/features/order/hooks/useOrderInfo';
import { DisassociateForm } from '@/features/stages/components/DisassociateForm';
import { AccordionList } from '@/shared/components/AccordionList';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { EmptyData } from '@/shared/components/EmptyData';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { formatTelefone } from '@/shared/utils/formatTelephone';
import {
    ArrowRight,
    Check,
    CircleCheck,
    Clock,
    Eye,
    Loader,
    Phone,
    Trash2,
    UserRound,
    UserRoundCheck,
    Waypoints,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AssignUserForm } from '../components/AssignUserForm';
import { Attachment } from '../components/Attachment';
import { CommentsForm } from '../components/CommentsForm';
import { OrderHistoryAccordion } from '../components/OrderHistoryAccordion';
import { OrderSheets } from '../components/OrderSheets';
import { useCalculateExecutionTime } from '../hooks/useCalculateExecutionTime';

export default function ViewOrder() {
    const { isAdmin, userLogged } = useAuthContext();
    const navigate = useNavigate();

    const {
        order,
        historicoAtual,
        historicoPassados,
        atribuir,
        seAtribuir,
        desatribuir,
        concluir,
        avancar,
        comments,
        viewAttachment,
        uploadFile,
        saveMeasurement,
        saveAssistance,
        disableActions,
    } = useOrderInfo();

    const isFinished = !!historicoAtual?.concluidoEm;

    const { calculateExecutionTime } = useCalculateExecutionTime();

    const handleViewAttachment = async (attachmentId: string) => {
        const attachment = await viewAttachment(attachmentId);

        if (attachment) {
            window.open(attachment.url_temporaria, '_blank');
        }
    };

    if (!historicoAtual || !order?.cliente) return <EmptyData />;

    return (
        <div className='space-y-10'>
            <div className='flex flex-wrap justify-between items-start gap-10'>
                <div className='flex lg:items-center flex-col lg:flex-row gap-2 lg:gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-xl md:text-2xl font-semibold'>
                                OS #{order.numero}
                            </h1>

                            <div>
                                {historicoAtual.concluidoEm ? (
                                    <Badge variant={'success'}>
                                        <Check /> Concluída
                                    </Badge>
                                ) : (
                                    <Badge variant={'warning'}>
                                        <Loader />
                                        Em andamento
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Iniciada em{' '}
                            {formatTimestamp(historicoAtual.criadoEm)}
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-4 flex-wrap'>
                    <OrderSheets
                        order={order}
                        stage={historicoAtual.etapa.descricao}
                        onSubmitMeasurement={saveMeasurement}
                        onSubmitAssistance={saveAssistance}
                    />

                    <Button variant='destructive'>
                        <Trash2 />
                    </Button>

                    {!historicoAtual.concluidoEm ? (
                        <ConfirmDialog
                            onConfirm={concluir}
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
                            onConfirm={avancar}
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
                            {historicoAtual.etapa.descricao}
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
                            {historicoAtual.atribuicoes.length > 0 &&
                                historicoAtual.atribuicoes?.map(
                                    ({ usuario }, index) => (
                                        <div className='flex items-center gap-2 mb-1'>
                                            <DisassociateForm
                                                key={index}
                                                title='Desatribuir usuário?'
                                                stage={historicoAtual.etapa}
                                                user={usuario}
                                                onSubmit={() =>
                                                    desatribuir(usuario.id)
                                                }
                                                disableActions={disableActions}
                                            />
                                            <span>{usuario.nome}</span>
                                        </div>
                                    )
                                )}

                            {isAdmin && (
                                <AssignUserForm
                                    stageUsers={
                                        historicoAtual.etapa.etapaUsuario
                                    }
                                    onAtribuir={atribuir}
                                />
                            )}

                            {!isAdmin &&
                                !historicoAtual.atribuicoes.some(
                                    (attr) => attr.usuario.id == userLogged?.id
                                ) && (
                                    <ConfirmDialog
                                        onConfirm={() => {
                                            seAtribuir(userLogged!.id);
                                        }}
                                        disabled={disableActions}
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
                                    className={`${isFinished ? 'bg-green-500' : 'bg-amber-600'} rounded-full text-white`}
                                />{' '}
                                Tempo de execução:
                                <span>
                                    {calculateExecutionTime(
                                        historicoAtual.criadoEm,
                                        historicoAtual.concluidoEm!
                                    )}
                                </span>
                            </div>

                            <div
                                className={`flex items-center gap-2 ${!isFinished && 'opacity-60'}`}
                            >
                                <CircleCheck
                                    size={17}
                                    className={`${isFinished ? 'bg-green-500' : 'bg-muted-foreground'} rounded-full text-white`}
                                />
                                Concluída em:
                                <span>
                                    {formatTimestamp(
                                        historicoAtual.concluidoEm
                                    )}
                                </span>
                            </div>

                            <div
                                className={`flex items-center gap-2 ${!isFinished && 'opacity-60'}`}
                            >
                                <UserRoundCheck size={17} />
                                Responsável:
                                <span>{historicoAtual.concluidoPor?.nome}</span>
                            </div>
                        </div>
                    </AccordionList>

                    <AccordionList title='Observações'>
                        <div className='flex items-center'>
                            <p>{historicoAtual.observacoes}</p>

                            <CommentsForm
                                key={historicoAtual.id}
                                observacoes={historicoAtual.observacoes}
                                onSubmit={comments}
                            />
                        </div>
                    </AccordionList>
                </div>
                <aside className='space-y-6'>
                    <AccordionList title='Anexos'>
                        <Attachment
                            attachments={order.anexos ?? []}
                            onUpload={uploadFile}
                            onRequestView={handleViewAttachment}
                            disableActions={disableActions}
                        />
                    </AccordionList>

                    <AccordionList title='Histórico'>
                        <OrderHistoryAccordion
                            order={order}
                            orderHistory={historicoPassados}
                        />
                    </AccordionList>
                </aside>
            </div>
        </div>
    );
}
