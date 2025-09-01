import { Switch } from '@/components/ui/switch';
import type { User } from '@/features/user/types/User';
import { cn } from '@/lib/utils';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';

interface UserStatusToggleProps {
    user: User;
    onToggle: (userId: string) => void;
    disableActions: boolean;
}

export function UserStatusToggle({
    user,
    onToggle,
    disableActions,
}: UserStatusToggleProps) {
    const actionTitle = user.isAtivo ? 'Desativar usuário' : 'Ativar usuário';

    return (
        <ConfirmDialog
            onConfirm={() => onToggle(user.id)}
            disabled={disableActions}
            title={actionTitle}
            description={`Deseja alterar o status de acesso do usuário "${user.nome}"?`}
            trigger={
                <Switch
                    className={cn(
                        user.isAtivo ? 'bg-green-500' : 'bg-slate-300'
                    )}
                    checked={user.isAtivo}
                />
            }
        />
    );
}
