import { useNavigate } from "react-router-dom";
import { CustomerList } from "./components/CustomerList";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerFilter } from "./components/CustomerFilter";
import { useCustomerList } from "./hooks/useCustomerList";

export default function CustomerPage(){
    const navigate = useNavigate();
    const { customers, search, setSearch } = useCustomerList();

    return (
        <div className="space-y-10">
            <PageHeader
                title="Clientes"
                subtitle="Gerencie seus clientes, visualize endereços e histórico de serviços"
                action={
                    <Button onClick={() => navigate("/sistema/clientes/form")}>
                        <Plus /> Novo cliente
                    </Button>
                }
            />
            
            <CustomerFilter search={search} onSearch={setSearch} />
            <CustomerList customers={customers} />
        </div>
    )
}