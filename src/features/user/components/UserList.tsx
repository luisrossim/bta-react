import { RoleBadge } from '@/features/user/components/RoleBadge';
import type { Roles } from '@/features/user/types/Role';
import { GenericTable, type Column } from '@/shared/components/GenericTable';
import { LoadingIcon } from '@/shared/components/LoadingIcon';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/User';
import { UserStatusToggle } from './UserStatusToggle';

interface UserListProps {
    users?: User[];
    onChangeUserStatus: (userId: number) => Promise<void>;
    isFetching: boolean;
    disableActions: boolean;
}

export function UserList({
    users = [],
    isFetching,
    onChangeUserStatus,
    disableActions,
}: UserListProps) {
    const navigate = useNavigate();

    if (isFetching) return <LoadingIcon />;

    const columns: Column<User>[] = [
        {
            header: 'Nome',
            render: (user) => <span className="font-medium">{user.nome}</span>,
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
                    format="(##) #####-####"
                    displayType="text"
                    value={user.telefone}
                />
            ),
        },
        {
            header: 'Criado em',
            render: (user) => (
                <span className="text-muted-foreground">
                    {formatTimestamp(user.criadoEm)}
                </span>
            ),
        },
        {
            header: 'Situação',
            render: (user) => (
                <UserStatusToggle
                    user={user}
                    onToggle={onChangeUserStatus}
                    disableActions={disableActions}
                />
            ),
        },
    ];

    return (
        <GenericTable
            data={users}
            columns={columns}
            actions={(user) => [
                {
                    label: 'Editar',
                    onClick: () =>
                        navigate(`/sistema/usuarios/form/${user.id}`),
                },
            ]}
        />
    );
}
