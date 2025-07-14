import ServiceOrderList from "./components/OrderList"
import { PageHeader } from "@/components/page-header";
import OrderForm from "./components/OrderForm";

export default function ServiceOrderPage() {
    return (
        <div className="space-y-14">
            <PageHeader 
                title="Ordens de serviço"
                subtitle="Acompanhe o progresso das ordens de serviço da empresa."
                action={ <OrderForm /> }
            />

            <ServiceOrderList />
        </div>
    );
}
