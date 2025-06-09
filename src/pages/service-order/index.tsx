import ServiceOrderList from "./service-order-list"
import { PageHeader } from "@/components/page-header";

export default function ServiceOrderPage() {
    return (
        <PageHeader 
            title="Ordens de serviço" 
            subtitle="Acompanhe o progresso das ordens de serviço da empresa." 
            redirectLabel="Nova ordem" 
            redirectTo="/sistema/ordens/form"
        >
            <ServiceOrderList />
        </PageHeader>
    );
}
