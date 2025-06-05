import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingWrapper } from "@/components/loading";
import type { Customer } from "@/models/customer";
import { ToastService } from "@/utils/services/toast-service";
import { UtilsService } from "@/utils/services/utils-service";
import { AlignRight, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customerService } from "@/services/customer-service";

export function CustomerList(){
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    
    useEffect(() => {
        fetchCustomers();
    }, [])


    const fetchCustomers = async () => {
        setLoading(true);

        try {
            const customers: Customer[] = await customerService.getAll();
            setCustomers(customers);

        } catch (err: any) {
            ToastService.showError(err?.response?.data?.message || err?.message)
        } finally {
            setLoading(false);
        }
    }


    if(loading) return <LoadingWrapper />

    if(!customers || customers.length == 0) return <p className="text-slate-500">Nenhum registro encontrado</p>

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
                        <TableCell>{customer.cpf}</TableCell>
                        <TableCell>{customer.telefone}</TableCell>
                        <TableCell className="text-slate-500">
                            {UtilsService.formatDate(customer.criadoEm)}
                        </TableCell>
                        
                        <TableCell className="flex gap-2 items-center justify-end">
                            <Link to={`/sistema/clientes/form/${customer.id}`} className="p-2"> 
                                <Edit2 size={16} className="text-slate-600" />
                            </Link>
                            <Link to={`/sistema/clientes/info/${customer.id}`} className="p-2"> 
                                <AlignRight size={16} className="text-blue-600" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}