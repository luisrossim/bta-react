import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingWrapper } from "@/components/loading";
import type { Customer } from "@/models/customer";
import { ToastService } from "@/utils/services/toast-service";
import { UtilsService } from "@/utils/services/utils-service";
import { AlignRight, Edit2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customerService } from "@/services/customer-service";
import { Input } from "@/components/ui/input";

export function CustomerList(){
    const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')

    
    useEffect(() => {
        fetchCustomers();
    }, [])

    useEffect(() => {
        const filtered = allCustomers.filter((customer) =>
            customer.nome.toLowerCase().includes(search.toLowerCase())
        );
        setCustomers(filtered);
    }, [search, allCustomers]);


    const fetchCustomers = async () => {
        setLoading(true);

        try {
            const _customers: Customer[] = await customerService.getAll();
            setCustomers(_customers);
            setAllCustomers(_customers);

        } catch (err: any) {
            ToastService.showError(err?.response?.data?.message || err?.message)
        } finally {
            setLoading(false);
        }
    }


    if(loading) return <LoadingWrapper />

    return (
        <div className="mt-4">
            <div className="flex relative mb-8 w-full lg:w-1/2 xl:w-1/3">
                <Input 
                    type="text" 
                    placeholder="Pesquisar" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <Search size={16} className="absolute right-5 top-3 text-neutral-500" />
            </div>

            {customers.length > 0 ? (
                <Table className="table-striped">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Atualizado em</TableHead>
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
                                <TableCell className="text-neutral-500">
                                    {UtilsService.formatDate(customer.atualizadoEm)}
                                </TableCell>
                                <TableCell className="text-neutral-500">
                                    {UtilsService.formatDate(customer.criadoEm)}
                                </TableCell>
                                
                                <TableCell className="flex gap-2 items-center justify-end">
                                    <Link to={`/sistema/clientes/form/${customer.id}`} className="p-1"> 
                                        <Edit2 size={16} className="text-neutral-600" />
                                    </Link>
                                    <Link to={`/sistema/clientes/info/${customer.id}`} className="p-1"> 
                                        <AlignRight size={16} className="text-primary" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-neutral-500">Nenhum registro encontrado</p>
            )}
        </div>
    )
}