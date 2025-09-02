import { Button } from '@/components/ui/button';
import {
    createCustomerSchema,
    type CreateCustomer,
} from '@/features/customer/types/Customer';
import { InputFormItem } from '@/shared/components/inputs-components/InputFormItem';
import { MaskFormItem } from '@/shared/components/inputs-components/MaskFormItem';
import { showError, showSuccess } from '@/shared/utils/showMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    useCreateCustomerMutation,
    useGetCustomerQuery,
    useUpdateCustomerMutation,
} from '../hooks/useCustomerApi';

interface CustomerFormProps {
    customerId?: string;
}

export default function CustomerForm({ customerId }: CustomerFormProps) {
    const { data: customer } = useGetCustomerQuery(customerId);
    const { mutateAsync: createCustomer } = useCreateCustomerMutation();
    const { mutateAsync: updateCustomer } = useUpdateCustomerMutation();
    const navigate = useNavigate();

    const form = useForm<CreateCustomer>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: {
            nome: '',
            telefone: '',
            cpf: '',
            endereco: {
                descricao: '',
            },
        },
    });

    const onSubmit = async (values: CreateCustomer) => {
        try {
            if (customerId) {
                await updateCustomer({ id: customerId, data: values });
            } else {
                await createCustomer(values);
            }

            showSuccess('Operação realizada com sucesso.');
            navigate('/sistema/clientes');
        } catch (err: any) {
            showError(err.message);
        }
    };

    useEffect(() => {
        if (customer) {
            form.reset(customer);
        }
    }, [customer, form]);

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='mt-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <InputFormItem label='Nome' name='nome' required />

                    <MaskFormItem
                        label='Telefone'
                        name='telefone'
                        format='(##) #####-####'
                        placeholder='(99) 99999-9999'
                        required
                    />

                    <MaskFormItem
                        label='CPF'
                        name='cpf'
                        format='###.###.###-##'
                        placeholder='999.999.999-99'
                        required
                    />

                    <InputFormItem
                        label='Endereço'
                        name='endereco.descricao'
                        required
                    />

                    <InputFormItem
                        label='Hectare'
                        name='endereco.hectare'
                        type='number'
                    />

                    <InputFormItem
                        label='Coordenadas'
                        name='endereco.coordenadasGeograficas'
                        placeholder='https://maps.app.goo.gl/yc9B8mFg6T8zUJTz8'
                    />

                    <InputFormItem
                        label='Loja x cliente (km)'
                        name='endereco.kmLojaCliente'
                        type='number'
                    />

                    <InputFormItem
                        label='Referência'
                        name='endereco.referencia'
                    />
                </div>

                <div className='flex items-center gap-4 mt-10'>
                    <Button type='submit'>
                        {customerId ? 'Salvar' : 'Cadastrar'}
                    </Button>

                    <Button
                        type='button'
                        variant={'outline'}
                        onClick={() => navigate(-1)}
                    >
                        Voltar
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
