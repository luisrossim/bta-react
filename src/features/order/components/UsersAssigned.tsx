import { Badge } from '@/components/ui/badge';

interface UsersAssignedProps {
    users: { id: string; nome: string }[];
}

export function UsersAssigned({ users }: UsersAssignedProps) {
    if (users.length === 0) return null;

    return (
        <div className='flex flex-wrap gap-2'>
            {users.map((user) => (
                <Badge key={user.id}>{user.nome.split(' ')[0]}</Badge>
            ))}
        </div>
    );
}
