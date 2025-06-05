import {
   Activity,
   ClipboardCheck,
   ListCheck,
   Package,
   UserLock,
   UsersRound,
} from "lucide-react";

export const navItems = [
   { label: "Atividades recentes", url: "/sistema", icon: Activity },
   { label: "Ordens de serviço", url: "/sistema/ordens", icon: ClipboardCheck },
   { label: "Clientes", url: "/sistema/clientes", icon: UsersRound },
   { label: "Usuários e permissões", url: "/sistema/usuarios", icon: UserLock },
   { label: "Etapas e vinculações", url: "/sistema/etapas", icon: ListCheck },
   { label: "Materiais", url: "/sistema/materiais", icon: Package },
];
