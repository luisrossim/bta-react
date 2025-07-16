import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UtilsService } from "@/utils/services/utils-service";
import { useNavigate } from "react-router-dom";
import type { Customer } from "@/models/customer";
import { PatternFormat } from "react-number-format";
import { DropdownActions } from "@/shared/components/DropdownActions";

interface CustomerListProps {
    customers: Customer[]
}

export function CustomerList({ customers }: CustomerListProps){
    const navigate = useNavigate(); 

    return (
        <Table className="table-striped">
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.nome}</TableCell>
                        <TableCell>
                            <PatternFormat 
                                format="###.###.###-##" 
                                displayType="text" 
                                value={customer.cpf} 
                            />
                        </TableCell>
                        <TableCell>
                            <PatternFormat 
                                format="(##) #####-####" 
                                displayType="text" 
                                value={customer.telefone} 
                            />
                        </TableCell>
                        <TableCell className="text-neutral-500">
                            {UtilsService.formatDate(customer.criadoEm)}
                        </TableCell>
                        
                        <TableCell className="flex gap-2 items-center justify-end">
                            <DropdownActions
                                actions={[
                                    {
                                        label: "Visualizar",
                                        onClick: () => navigate(`/sistema/clientes/info/${customer.id}`)
                                    },
                                    {
                                        label: "Editar",
                                        onClick: () => navigate(`/sistema/clientes/form/${customer.id}`)
                                    }
                                ]}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}