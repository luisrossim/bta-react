import { Button } from '@/components/ui/button';
import { InputFormItem } from '@/shared/components/inputs-components/InputFormItem';
import { LoadingIcon } from '@/shared/components/LoadingIcon';
import { showError } from '@/shared/utils/showMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useLoginMutation } from '../hooks/useAuthApi';
import {
    authRequestSchema,
    type AuthRequest,
    type AuthUser,
} from '../types/Auth';

export function LoginForm() {
    const navigate = useNavigate();
    const { saveLogin } = useAuthContext();
    const { mutateAsync: authenticate, isPending } = useLoginMutation();

    const form = useForm<AuthRequest>({
        resolver: zodResolver(authRequestSchema),
    });

    const onSubmit = async (values: AuthRequest) => {
        try {
            const response = await authenticate(values);
            actionsForSuccess(response);
        } catch (err: any) {
            showError(err.message);
        }
    };

    function actionsForSuccess(user: AuthUser) {
        saveLogin(user);
        navigate('/sistema', { replace: true });
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid gap-6 py-2 pb-6'>
                    <InputFormItem
                        label='Email'
                        name='login'
                        placeholder='fulano@btairrigacao.com.br'
                    />

                    <InputFormItem
                        label='Senha'
                        name='password'
                        type='password'
                    />
                </div>

                <Button type='submit' className='w-full' disabled={isPending}>
                    {isPending ? (
                        <LoadingIcon className='text-white' />
                    ) : (
                        'Acessar'
                    )}
                </Button>
            </form>
        </FormProvider>
    );
}
