import { CustomerList } from "./customer-list";
import { PageHeader } from "@/components/page-header";

export default function CustomerPage(){
    return (
        <PageHeader
            title="Clientes"
            subtitle="Gerencie seus clientes, visualize endereços e histórico de serviços"
            redirectLabel="Novo cliente"
            redirectTo="/sistema/clientes/form"
        >
            <CustomerList />
        </PageHeader>
    )
}