import {
    ChartColumn,
    ClipboardList,
    ListCheck,
    Package,
    UserLock,
    UsersRound,
} from 'lucide-react';

const SIDEBAR_ITEMS = [
    { label: 'Ordens de serviço', url: '/sistema/ordens', icon: ClipboardList },
    { label: 'Etapas e vinculações', url: '/sistema/etapas', icon: ListCheck },
    { label: 'Usuários', url: '/sistema/usuarios', icon: UserLock },
    { label: 'Clientes', url: '/sistema/clientes', icon: UsersRound },
    { label: 'Relatórios', url: '/sistema/reports', icon: ChartColumn },
    { label: 'Materiais', url: '/sistema/materiais', icon: Package },
];

const adminOnlyLabels = ['Usuários', 'Etapas e vinculações', 'Relatórios'];

function getSidebarItems(role?: string) {
    if (!role) return [];

    if (role === 'Administrador') {
        return SIDEBAR_ITEMS;
    } else {
        return SIDEBAR_ITEMS.filter(
            (item) => !adminOnlyLabels.includes(item.label)
        );
    }
}

export { getSidebarItems, SIDEBAR_ITEMS };
