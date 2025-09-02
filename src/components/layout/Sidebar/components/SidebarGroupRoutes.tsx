import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { type LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MenuRoutes {
    label: string;
    icon: LucideIcon;
    url: string;
}

interface SidebarRoutesProps {
    routes: MenuRoutes[];
}

export function SidebarGroupRoutes({ routes }: SidebarRoutesProps) {
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    const location = useLocation();

    const handleCloseSidebar = () => {
        if (isMobile) {
            toggleSidebar();
        }
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {routes.map((route) => {
                    const isActive = location.pathname === route.url;
                    return (
                        <SidebarMenuItem key={route.label}>
                            <SidebarMenuButton asChild tooltip={route.label}>
                                <Link
                                    to={route.url}
                                    className={`flex items-center gap-2 ${isActive ? 'bg-accent text-accent-foreground' : ''}`}
                                    onClick={handleCloseSidebar}
                                >
                                    <route.icon className='shrink-0' />
                                    <span className='group-data-[collapsible=icon]:hidden'>
                                        {route.label}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
