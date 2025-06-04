import { PageSubtitle, PageTitle } from "@/components/page-title";
import { UserList } from "./user-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserPage() {
    return (
        <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-wrap justify-between gap-6 items-end">
                <div className="grid grid-cols-1 gap-2">
                    <PageTitle title="Usuários e permissões" />
                    <PageSubtitle subtitle="Gerencie as informações e permissões dos usuários do sistema" />
                </div>

                <Link to={"/sistema/usuarios/novo"}>
                    <Button><Plus /> Novo usuário</Button>
                </Link>
            </div>

            <UserList />
        </div>
    )
}