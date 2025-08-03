import { useNavigate } from "react-router-dom";
import type { Customer } from "@/features/customer/types/Customer";
import { PatternFormat } from "react-number-format";
import { formatDate } from "@/shared/utils/formatDate";
import { GenericTable, type Column } from "@/shared/components/GenericTable";
import { LoadingIcon } from "@/shared/components/LoadingIcon";

interface CustomerTableProps {
    customers?: Customer[];
    isFetching: boolean;
}

export function CustomerTable({ 
    customers = [],
    isFetching
}: CustomerTableProps){
    const navigate = useNavigate();

    if(isFetching) return <LoadingIcon />

    const columns: Column<Customer>[] = [
        {
            header: "Nome",
            render: (customer) => <span className="font-medium">{customer.nome}</span>,
        },
        {
            header: "CPF",
            render: (customer) => (
                <PatternFormat 
                    format="###.###.###-##" 
                    displayType="text" 
                    value={customer.cpf} 
                />
            ),
        },
        {
            header: "Telefone",
            render: (customer) => (
                <PatternFormat 
                    format="(##) #####-####" 
                    displayType="text" 
                    value={customer.telefone} 
                />
            ),
        },
        {
            header: "Criado em",
            render: (customer) => (
                <span className="text-slate-500">
                    {formatDate(customer.criadoEm)}
                </span>
            )
        },
    ]

    return (
        <GenericTable
            data={customers}
            columns={columns}
            actions={(customer) => [
                {
                    label: "Visualizar",
                    onClick: () => navigate(`/sistema/clientes/${customer.id}`),
                },
                {
                    label: "Editar",
                    onClick: () => navigate(`/sistema/clientes/form/${customer.id}`),
                },
            ]}
        />
    );
}