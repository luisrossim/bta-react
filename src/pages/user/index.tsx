import { PageTitle } from "@/components/page-title";
import { UserList } from "./user-list";

export default function UserPage() {
    return (
        <div className="grid grid-cols-1 gap-4">
            <PageTitle title="Usuários e permissões" />
            <UserList />
        </div>
    )
}