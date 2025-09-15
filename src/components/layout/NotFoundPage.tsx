import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className='relative w-screen h-screen bg-white text-slate-900 flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-white shadow rounded-xl p-8 text-center'>
                <div className='flex flex-col items-center gap-4'>
                    <AlertCircle className='w-12 h-12 text-primary' />

                    <div className='space-y-1'>
                        <h1 className='text-2xl font-semibold text-slate-800'>
                            Recurso indisponível
                        </h1>
                        <p className='text-sm text-slate-600'>
                            Essa funcionalidade não está disponível no sistema.
                        </p>
                    </div>

                    <Link to='/sistema'>
                        <Button className='mt-6 bg-slate-800 hover:bg-slate-900 text-white'>
                            Voltar para o início
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
