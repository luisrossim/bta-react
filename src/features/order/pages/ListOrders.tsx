import { PageHeader } from "@/shared/components/PageHeader";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";

export default function ListOrders() {
    return (
        <div className="space-y-14">
            <PageHeader 
                title="Ordens de serviço"
                subtitle="Acompanhe o progresso das ordens de serviço da empresa."
                action={ <OrderForm /> }
            />

            <OrderList />
        </div>
    );
}
