import type { Column } from '@/shared/components/table-components/GenericTable';
import { formatDate } from '@/shared/utils/formatDate';
import { PatternFormat } from 'react-number-format';
import type { Customer } from '../types/Customer';

export const customerColumns: Column<Customer>[] = [
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
