import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerFilter } from "../components/CustomerFilter";
import { CustomerTable } from "../components/CustomerTable";

import { useState, useMemo } from "react";
import { useGetCustomersQuery } from "../hooks/useCustomerApi";

export default function ListCustomers() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { data: customers, isFetching } = useGetCustomersQuery();

    const filteredCustomers = useMemo(() => {
        if (!customers) return [];

        const searchTerm = search.trim().toLowerCase();

        return customers.filter((customer) => (
            customer.nome.toLowerCase().startsWith(searchTerm) ||
            customer.cpf.startsWith(searchTerm)
        ));
    }, [customers, search]);

    return (
        <div className="space-y-10">
            <PageHeader
                title="Clientes"
                subtitle="Gerencie seus clientes, visualize endereços e acompanhe o histórico de serviços com facilidade."
                action={
                    <Button onClick={() => navigate("/sistema/clientes/form")}>
                        <Plus /> Novo cliente
                    </Button>
                }
            />

            <CustomerFilter
                search={search}
                onSearch={setSearch} 
            />

            <CustomerTable 
                customers={filteredCustomers} 
                isFetching={isFetching} 
            />
        </div>
    );
}
