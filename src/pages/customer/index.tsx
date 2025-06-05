import { PageSubtitle, PageTitle } from "@/components/page-title";
import { CustomerList } from "./customer-list";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CustomerPage(){
    return (
         <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-wrap justify-between gap-6 items-end">
                <div>
                    <PageTitle title="Clientes" />
                    <PageSubtitle subtitle="Gerencie seus clientes, visualize endereços e histórico de serviços" />
                </div>

                <Link to={"/sistema/clientes/form"}>
                    <Button><Plus /> Novo cliente</Button>
                </Link>
            </div>

            <CustomerList />
        </div>
    )
}