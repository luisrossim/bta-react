import { UserList } from "./user-list";
import { PageHeader } from "@/components/page-header";

export default function UserPage() {
    return (
        <>
            <PageHeader 
                title="Usuários e permissões"
                subtitle="Gerencie as informações e permissões dos usuários do sistema."
                redirectLabel="Novo usuário"
                redirectTo="/sistema/usuarios/form"
            />

            <UserList />
        </>
    )
}