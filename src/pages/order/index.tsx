import { useNavigate } from "react-router-dom";
import ServiceOrderList from "./OrderList"
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ServiceOrderPage() {
    const navigate = useNavigate();

    return (
        <>
            <PageHeader 
                title="Ordens de serviço" 
                subtitle="Acompanhe o progresso das ordens de serviço da empresa."
                action={
                    <Button onClick={() => navigate("/sistema/ordens/form")}>
                        <Plus /> Nova ordem
                    </Button>
                }
            />

            <ServiceOrderList />
        </>
    );
}
