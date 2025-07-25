import { Button } from "@/components/ui/button";
import { UserList } from "./components/UserList";
import { PageHeader } from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-14">
            <PageHeader 
                title="Usuários e permissões"
                subtitle="Gerencie as informações e permissões dos usuários do sistema."
                action={
                    <Button onClick={() => navigate("/sistema/usuarios/form")}>
                        <Plus /> Novo usuário
                    </Button>
                }
            />

            <UserList />
        </div>
    )
}