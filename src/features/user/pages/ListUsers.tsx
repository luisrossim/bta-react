import { Button } from "@/components/ui/button";
import { PageHeader } from "@/shared/components/PageHeader";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserList } from "../components/UserList";

export default function ListUsers() {
    const navigate = useNavigate();

    return (
        <div className="space-y-14">
            <PageHeader 
                title="Usuários e permissões"
                subtitle="Gerencie as informações e permissões dos usuários do sistema."
                action={
                    <Button onClick={() => navigate("/sistema/usuarios/form")}>
                        <Plus /> Adicionar
                    </Button>
                }
            />

            <UserList />
        </div>
    )
}