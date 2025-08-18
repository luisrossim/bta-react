import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/features/auth/contexts/AuthContext';
import { useOrderInfo } from '@/features/order/hooks/useOrderInfo';
import { DisassociateForm } from '@/features/stages/components/DisassociateForm';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { EmptyData } from '@/shared/components/EmptyData';
import { ListItem } from '@/shared/components/ListItem';
import { PageTitle } from '@/shared/components/PageHeader';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { formatTelefone } from '@/shared/utils/formatTelephone';
import {
    ArrowRight,
    CheckCircle,
    ClipboardList,
    Phone,
    UserRound,
    Waypoints,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AssignUserForm } from '../components/AssignUserForm';
import { Attachment } from '../components/Attachment';
import { CommentsForm } from '../components/CommentsForm';
import { OrderHistoryAccordion } from '../components/OrderHistoryAccordion';
import { OrderSheets } from '../components/OrderSheets';
import { useCalculateExecutionTime } from '../hooks/useCalculateExecutionTime';

export default function ViewOrder() {
    const { isAdmin, userLogged } = useAuthContext();

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

    const { calculateExecutionTime } = useCalculateExecutionTime();

    const handleViewAttachment = async (attachmentId: string) => {
        const attachment = await viewAttachment(attachmentId);

        if (attachment) {
            window.open(attachment.url_temporaria, '_blank');
        }
    };

    if (!historicoAtual || !order?.cliente) return <EmptyData />;

    return (
        <div className='space-y-14 mb-14'>
            <div className='flex flex-wrap justify-between items-center gap-10'>
                <div>
                    <PageTitle title='Ordem de serviço' />

                    <div className='flex flex-col gap-2 text-sm text-primary mt-4'>
                        <div className='flex items-center gap-2'>
                            <ClipboardList size={16} />
                            <h2>N° {order.numero}</h2>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Waypoints size={16} />
                            <h2>{historicoAtual.etapa.descricao}</h2>
                        </div>
                        <Link
                            to={`/sistema/clientes/${order.cliente.id}`}
                            className='hover:bg-accent transition-colors'
                        >
                            <div className='flex items-center flex-wrap gap-4'>
                                <div className='flex items-center gap-2'>
                                    <UserRound size={16} />
                                    <h2>{order.cliente.nome}</h2>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Phone size={14} />
                                    {formatTelefone(order.cliente.telefone)}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='flex items-center gap-4 flex-wrap'>
                    <OrderSheets
                        order={order}
                        stage={historicoAtual.etapa.descricao}
                        onSubmitMeasurement={saveMeasurement}
                        onSubmitAssistance={saveAssistance}
                    />

                    {!historicoAtual.concluidoEm ? (
                        <ConfirmDialog
                            onConfirm={concluir}
                            title='Concluir etapa?'
                            trigger={
                                <Button>
                                    <CheckCircle />
                                    Concluir
                                </Button>
                            }
                        />
                    ) : (
                        <ConfirmDialog
                            onConfirm={avancar}
                            title='Avançar etapa?'
                            trigger={
                                <Button size={'lg'}>
                                    <ArrowRight /> Avançar
                                </Button>
                            }
                        />
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                <ListItem
                    label='Situação'
                    className='bg-muted p-3 rounded-sm'
                    value={
                        <div>
                            {historicoAtual.concluidoEm ? (
                                <Badge variant={'success'}>Concluída</Badge>
                            ) : (
                                <Badge variant={'warning'}>Em andamento</Badge>
                            )}
                        </div>
                    }
                />

                <ListItem
                    label='Técnicos atribuídos'
                    className='bg-muted p-3 rounded-sm'
                    value={
                        <>
                            {historicoAtual.atribuicoes.length > 0 &&
                                historicoAtual.atribuicoes?.map(
                                    ({ usuario }, index) => (
                                        <div className='flex items-center gap-2'>
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
                                            <span className='font-medium'>
                                                {usuario.nome}
                                            </span>
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
                                            <Button
                                                size={'sm'}
                                                variant={'dark'}
                                            >
                                                Auto atribuir
                                            </Button>
                                        }
                                    />
                                )}
                        </>
                    }
                />

                <ListItem
                    label='Tempo de execução'
                    className='bg-muted p-3 rounded-sm'
                    value={calculateExecutionTime(
                        historicoAtual.criadoEm,
                        historicoAtual.concluidoEm!
                    )}
                />

                <ListItem
                    label='Iniciada em'
                    className='bg-muted p-3 rounded-sm'
                    value={formatTimestamp(historicoAtual.criadoEm)}
                />

                <ListItem
                    label='Concluída em'
                    className='bg-muted p-3 rounded-sm'
                    value={formatTimestamp(historicoAtual.concluidoEm)}
                />

                <ListItem
                    label='Concluída por'
                    className='bg-muted p-3 rounded-sm'
                    value={historicoAtual.concluidoPor?.nome}
                />
            </div>

            <Tabs defaultValue='anexos'>
                <TabsList className='mb-2'>
                    <TabsTrigger value='anexos'>Anexos</TabsTrigger>
                    <TabsTrigger value='history'>Histórico</TabsTrigger>
                    <TabsTrigger value='comments'>Observações</TabsTrigger>
                </TabsList>

                <TabsContent value='anexos'>
                    <Attachment
                        attachments={order.anexos ?? []}
                        onUpload={uploadFile}
                        onRequestView={handleViewAttachment}
                        disableActions={disableActions}
                    />
                </TabsContent>

                <TabsContent value='history'>
                    <OrderHistoryAccordion
                        order={order}
                        orderHistory={historicoPassados}
                    />
                </TabsContent>

                <TabsContent value='comments'>
                    <CommentsForm
                        key={historicoAtual.id}
                        observacoes={historicoAtual.observacoes}
                        onSubmit={comments}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
