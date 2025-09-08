import welcome from '@/assets/images/welcome.avif';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { LoginHeader } from '../components/LoginHeader';
import { useAuthContext } from '../contexts/AuthContext';

export default function LoginFormPage() {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/sistema');
        }
    }, [isAuthenticated]);

    return (
        <div className='grid min-h-svh lg:grid-cols-3'>
            <div className='flex flex-col gap-4 p-4 md:p-10 col-span-2'>
                <LoginHeader />

                <div className='flex flex-1 items-center justify-center'>
                    <div className='w-full max-w-lg space-y-8'>
                        <div className='flex flex-col items-start gap-1'>
                            <h1 className='text-3xl font-bold'>Acessar</h1>
                            <p>Informe suas credenciais de acesso:</p>
                        </div>

                        <LoginForm />
                    </div>
                </div>
            </div>

            <div
                className='bg-muted relative hidden lg:block bg-cover bg-center hue-rotate-15 m-4 rounded-2xl'
                style={{
                    backgroundImage: `url(${welcome})`,
                    backgroundPosition: 'bottom',
                }}
            ></div>
        </div>
    );
}
