import { useNavigate } from "react-router-dom";
import type { Customer } from "@/features/customer/types/Customer";
import { PatternFormat } from "react-number-format";
import { formatDate } from "@/shared/utils/formatDate";
import { GenericTable } from "@/shared/components/GenericTable";

interface CustomerTableProps {
    customers?: Customer[]
}

export function CustomerTable({ 
    customers = [] 
}: CustomerTableProps){
    const navigate = useNavigate(); 

    return (
        <GenericTable
            data={customers}
            columns={[
                {
                    header: "Nome",
                    render: (c) => <span className="font-medium">{c.nome}</span>,
                },
                {
                    header: "CPF",
                    render: (c) => (
                        <PatternFormat 
                            format="###.###.###-##" 
                            displayType="text" 
                            value={c.cpf} 
                        />
                    ),
                },
                {
                    header: "Telefone",
                    render: (c) => (
                        <PatternFormat 
                            format="(##) #####-####" 
                            displayType="text" 
                            value={c.telefone} 
                        />
                    ),
                },
                {
                    header: "Criado em",
                    render: (c) => (
                        <span className="text-slate-500">
                            {formatDate(c.criadoEm)}
                        </span>
                    )
                },
            ]}
            actions={(customer) => [
                {
                    label: "Visualizar",
                    onClick: () => navigate(`/sistema/clientes/info/${customer.id}`),
                },
                {
                    label: "Editar",
                    onClick: () => navigate(`/sistema/clientes/form/${customer.id}`),
                },
            ]}
        />
    );
}