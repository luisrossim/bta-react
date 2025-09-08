import { Button } from '@/components/ui/button';
import { PageHeader } from '@/shared/components/PageHeader';
import { GenericTable } from '@/shared/components/table-components/GenericTable';
import { PaginationFooter } from '@/shared/components/table-components/PaginationFooter';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerColumns } from '../components/CustomerColumns';
import { CustomerFilter } from '../components/CustomerFilter';
import { useGetCustomersQuery } from '../hooks/useCustomerApi';

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
                    isLoading={isFetching}
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
