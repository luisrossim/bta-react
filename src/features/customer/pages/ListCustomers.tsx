import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerFilter } from "../components/CustomerFilter";
import { CustomerTable } from "../components/CustomerTable";

import { useState, useMemo } from "react";
import { useGetCustomers } from "../hooks/useCustomerApi";

export default function ListCustomers() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { data: customers } = useGetCustomers();

    const filteredCustomers = useMemo(() => {
        if (!customers) return [];

        const searchTerm = search.trim().toLowerCase();

        return customers.filter((c) => (
            c.nome.toLowerCase().startsWith(searchTerm) ||
            c.cpf.startsWith(searchTerm)
        ));
    }, [customers, search]);

  return (
    <div className="space-y-10">
        <PageHeader
            title="Clientes"
            subtitle="Gerencie seus clientes, visualize endereços e histórico de serviços"
            action={
            <Button onClick={() => navigate("/sistema/clientes/form")}>
                <Plus /> Adicionar
            </Button>
            }
        />

        <CustomerFilter search={search} onSearch={setSearch} />
        <CustomerTable customers={filteredCustomers} />
    </div>
  );
}
