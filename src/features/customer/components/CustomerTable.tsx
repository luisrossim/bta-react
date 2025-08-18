import type { Customer } from '@/features/customer/types/Customer';
import { GenericTable, type Column } from '@/shared/components/GenericTable';
import { LoadingIcon } from '@/shared/components/LoadingIcon';
import { formatDate } from '@/shared/utils/formatDate';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

interface CustomerTableProps {
    customers?: Customer[];
    isFetching: boolean;
}

export function CustomerTable({
    customers = [],
    isFetching,
}: CustomerTableProps) {
    const navigate = useNavigate();

    if (isFetching) return <LoadingIcon />;

    const columns: Column<Customer>[] = [
        {
            header: 'Nome',
            render: (customer) => (
                <span className='font-medium'>{customer.nome}</span>
            ),
        },
        {
            header: 'CPF',
            render: (customer) => (
                <PatternFormat
                    format='###.###.###-##'
                    displayType='text'
                    value={customer.cpf}
                />
            ),
        },
        {
            header: 'Telefone',
            render: (customer) => (
                <PatternFormat
                    format='(##) #####-####'
                    displayType='text'
                    value={customer.telefone}
                />
            ),
        },
        {
            header: 'Endereço',
            render: (customer) => (
                <div className='w-[180px] truncate'>
                    <span>{customer.endereco.descricao}</span>
                </div>
            ),
        },
        {
            header: 'Criado em',
            render: (customer) => (
                <span className='text-muted-foreground'>
                    {formatDate(customer.criadoEm)}
                </span>
            ),
        },
    ];

    return (
        <GenericTable
            data={customers}
            columns={columns}
            actions={(customer) => [
                {
                    label: 'Visualizar',
                    onClick: () => navigate(`/sistema/clientes/${customer.id}`),
                },
                {
                    label: 'Editar',
                    onClick: () =>
                        navigate(`/sistema/clientes/form/${customer.id}`),
                },
            ]}
        />
    );
}
