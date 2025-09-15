import { Button } from '@/components/ui/button';
import { PageHeader } from '@/shared/components/PageHeader';
import {
    GenericTable,
    type Column,
} from '@/shared/components/table-components/GenericTable';
import { PaginationFooter } from '@/shared/components/table-components/PaginationFooter';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { formatDate } from '@/shared/utils/formatDate';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { CustomerFilter } from '../components/CustomerFilter';
import { useGetCustomersQuery } from '../hooks/useCustomerApi';
import type { Customer } from '../types/Customer';

export default function ListCustomers() {
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search, 500);

    const { data: result, isFetching } = useGetCustomersQuery(
        debouncedSearch,
        page
    );

    function handleSearchChange(search: string) {
        setSearch(search);
        setPage(1);
    }

    const customerColumns: Column<Customer>[] = [
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
        <div className='space-y-10'>
            <PageHeader
                title='Clientes'
                subtitle='Gerencie seus clientes, visualize endereços e acompanhe o histórico de serviços do cliente específico.'
                action={
                    <Button onClick={() => navigate('/sistema/clientes/form')}>
                        <Plus /> Novo cliente
                    </Button>
                }
            />

            <div className='grid grid-cols-1 gap-8'>
                <CustomerFilter search={search} onSearch={handleSearchChange} />

                <GenericTable
                    data={result?.data}
                    columns={customerColumns}
                    loading={isFetching}
                    actions={(customer) => [
                        {
                            label: 'Visualizar',
                            onClick: () =>
                                navigate(`/sistema/clientes/${customer.id}`),
                        },
                        {
                            label: 'Editar',
                            onClick: () =>
                                navigate(
                                    `/sistema/clientes/form/${customer.id}`
                                ),
                        },
                    ]}
                />

                {result && result.data.length > 0 && (
                    <PaginationFooter
                        page={result.page}
                        totalItems={result.totalItems}
                        totalPages={result.totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    );
}
