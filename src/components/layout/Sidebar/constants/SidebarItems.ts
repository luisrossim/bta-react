import {
  ClipboardList,
  LayoutDashboard,
  ListCheck,
  Package,
  UserLock,
  UsersRound,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", url: "/sistema/dashboard", icon: LayoutDashboard },
  { label: "Ordens de serviço", url: "/sistema/ordens", icon: ClipboardList },
  { label: "Clientes", url: "/sistema/clientes", icon: UsersRound },
  { label: "Usuários e permissões", url: "/sistema/usuarios", icon: UserLock },
  { label: "Etapas e vinculações", url: "/sistema/etapas", icon: ListCheck },
  { label: "Materiais", url: "/sistema/materiais", icon: Package },
];

const adminOnlyLabels = [
  "Usuários e permissões",
  "Etapas e vinculações",
];

function getSidebarItems(role?: string) {
   if(!role) return [];

   if (role === "Admin") {
      return SIDEBAR_ITEMS;
   } else {
      return SIDEBAR_ITEMS.filter(
         (item) => !adminOnlyLabels.includes(item.label)
      );
   }
}

export { SIDEBAR_ITEMS, getSidebarItems };
