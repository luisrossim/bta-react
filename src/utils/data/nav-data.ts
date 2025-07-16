import {
   ClipboardList,
   HelpCircle,
   LayoutDashboard,
   ListCheck,
   Package,
   UserLock,
   UsersRound,
} from "lucide-react";

export const navData = [
   { label: "Dashboard", url: "/sistema/dashboard", icon: LayoutDashboard },
   { label: "Ordens de serviço", url: "/sistema/ordens", icon: ClipboardList },
   { label: "Clientes", url: "/sistema/clientes", icon: UsersRound },
   { label: "Usuários e permissões", url: "/sistema/usuarios", icon: UserLock },
   { label: "Etapas e vinculações", url: "/sistema/etapas", icon: ListCheck },
   { label: "Materiais", url: "/sistema/materiais", icon: Package },
   { label: "Suporte", url: "/sistema/suporte", icon: HelpCircle },
];
