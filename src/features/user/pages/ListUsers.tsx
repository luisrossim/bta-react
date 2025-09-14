import { Button } from '@/components/ui/button';
import { PageHeader } from '@/shared/components/PageHeader';
import {
    GenericTable,
    type Column,
} from '@/shared/components/table-components/GenericTable';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { Plus } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { RoleBadge } from '../components/RoleBadge';
import { UserStatusToggle } from '../components/UserStatusToggle';
import { useChangeStatusMutation, useGetUsersQuery } from '../hooks/useUserApi';
import type { Roles } from '../types/Role';
import type { User } from '../types/User';

export default function ListUsers() {
    const navigate = useNavigate();
    const { data, isFetching } = useGetUsersQuery();
    const { mutate: changeStatus, isPending } = useChangeStatusMutation();

    const columns: Column<User>[] = [
        {
            header: 'Nome',
            render: (user) => <span className='font-medium'>{user.nome}</span>,
        },
        {
            header: 'Cargo',
            render: (user) => (
                <RoleBadge
                    role={user.role.descricao as Roles}
                    rounded={false}
                />
            ),
        },
        {
            header: 'Email',
            render: (user) => user.email,
        },
        {
            header: 'Telefone',
            render: (user) => (
                <PatternFormat
                    format='(##) #####-####'
                    displayType='text'
                    value={user.telefone}
                />
            ),
        },
        {
            header: 'Criado em',
            render: (user) => (
                <span className='text-muted-foreground'>
                    {formatTimestamp(user.criadoEm)}
                </span>
            ),
        },
        {
            header: 'Situação',
            render: (user) => (
                <UserStatusToggle
                    user={user}
                    onToggle={changeStatus}
                    pending={isPending}
                />
            ),
        },
    ];

    return (
        <div className='space-y-14'>
            <PageHeader
                title='Usuários'
                subtitle='Gerencie as informações e permissões dos usuários do sistema.'
                action={
                    <Button onClick={() => navigate('/sistema/usuarios/form')}>
                        <Plus /> Novo usuário
                    </Button>
                }
            />

            <div className='grid grid-cols-1'>
                <GenericTable
                    data={data}
                    loading={isFetching}
                    columns={columns}
                    actions={(user) => [
                        {
                            label: 'Editar',
                            onClick: () =>
                                navigate(`/sistema/usuarios/form/${user.id}`),
                        },
                    ]}
                />
            </div>
        </div>
    );
}
