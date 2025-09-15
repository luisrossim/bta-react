import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useAuthContext } from '@/features/auth/contexts/AuthContext';
import { HelpCircle, LogOut, Settings } from 'lucide-react';

export function SidebarFooterContent() {
    const { isMobile } = useSidebar();
    const { userLogged, logout } = useAuthContext();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <Avatar>
                                <AvatarFallback className='bg-transparent'>
                                    <Settings />
                                </AvatarFallback>
                            </Avatar>

                            <div className='grid flex-1 text-left leading-tight'>
                                <span className='font-medium truncate text-sm'>
                                    {userLogged?.login}
                                </span>
                                <span className='text-xs'>
                                    {userLogged?.role}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuItem onClick={() => {}}>
                            <HelpCircle /> Suporte
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => logout()}>
                            <LogOut /> Sair do sistema
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
