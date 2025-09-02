import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { GlobalHeader } from './GlobalHeader';
import { SidebarLayout } from './Sidebar';

export default function MainLayout() {
    return (
        <SidebarProvider>
            <SidebarLayout />
            <SidebarInset>
                <GlobalHeader />
                <main className='bg-white h-full px-5 py-10 md:px-10 md:py-10'>
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
