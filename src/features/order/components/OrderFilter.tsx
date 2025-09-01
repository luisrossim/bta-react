import { useAuthContext } from '@/features/auth/contexts/AuthContext';
import {
    orderFiltersSchema,
    type OrderFilters,
} from '@/features/order/types/OrderFilters';
import { useGetStagesQuery } from '@/features/stages/hooks/useStageApi';
import type { Stage } from '@/features/stages/types/Stage';
import { useGetUsersQuery } from '@/features/user/hooks/useUserApi';
import type { User } from '@/features/user/types/User';
import { DatePickerFormItem } from '@/shared/components/inputs-components/DatePickerFormItem';
import { SelectAsyncFormItem } from '@/shared/components/inputs-components/SelectAsyncFormItem';
import { SelectFormItem } from '@/shared/components/inputs-components/SelectFormItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMonths, startOfMonth, subDays, subMonths } from 'date-fns';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { situationOptions } from '../constants/situationOptions';

interface OrderFilterProps {
    onSubmit: (data: OrderFilters) => void;
}

export function OrderFilter({ onSubmit }: OrderFilterProps) {
    const { isAdmin } = useAuthContext();
    const { isFetching: loadingStages, refetch: getStages } = useGetStagesQuery(
        { enabled: false }
    );
    const { isFetching: loadingUsers, refetch: getUsers } = useGetUsersQuery({
        enabled: false,
    });

    const form = useForm<OrderFilters>({
        resolver: zodResolver(orderFiltersSchema),
        defaultValues: {
            startDate: startOfMonth(subMonths(new Date(), 6)),
            endDate: subDays(startOfMonth(addMonths(new Date(), 1)), 1),
        },
    });

    const watchedFormValues = useWatch({ control: form.control });

    useEffect(() => {
        onSubmit(watchedFormValues);
    }, [watchedFormValues]);

    return (
        <FormProvider {...form}>
            <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-end my-4'>
                {isAdmin && (
                    <SelectAsyncFormItem
                        name='userId'
                        label='Usuário'
                        fetchOptions={getUsers}
                        isLoading={loadingUsers}
                        getOptions={(data) =>
                            data.map((u: User) => ({
                                label: u.nome,
                                value: u.id,
                            }))
                        }
                    />
                )}

                <SelectAsyncFormItem
                    name='stageId'
                    label='Etapa'
                    fetchOptions={getStages}
                    isLoading={loadingStages}
                    getOptions={(data) =>
                        data.map((u: Stage) => ({
                            label: u.descricao,
                            value: u.id,
                        }))
                    }
                />

                <SelectFormItem
                    name='status'
                    label='Situação'
                    options={situationOptions}
                />

                <DatePickerFormItem
                    name='startDate'
                    label='Data inicial'
                    disabledDates={{
                        after: watchedFormValues.endDate,
                    }}
                />

                <DatePickerFormItem
                    name='endDate'
                    label='Data final'
                    disabledDates={{
                        before: watchedFormValues.startDate,
                    }}
                />
            </form>
        </FormProvider>
    );
}
