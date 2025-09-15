import type { ReactNode } from 'react';
import {
    useAssistanceMutation,
    useMeasurementMutation,
} from '../../hooks/useOrderApi';
import type { Order } from '../../types/Order';
import { AssistanceForm } from './components/AssistanceForm';
import { MeasurementForm } from './components/MeasurementForm';

interface OrderSheetsProps {
    order: Order;
    stage: string;
}

export function OrderSheets({ order, stage }: OrderSheetsProps) {
    const { mutate: measurement } = useMeasurementMutation();
    const { mutate: assistance } = useAssistanceMutation();

    const stageComponents: Record<string, ReactNode> = {
        Medição: (
            <MeasurementForm
                order={order}
                onSubmit={(values) =>
                    measurement({
                        orderId: order.id,
                        values,
                    })
                }
            />
        ),
        Assistência: (
            <AssistanceForm
                order={order}
                onSubmit={(values) =>
                    assistance({
                        orderId: order.id,
                        values,
                    })
                }
            />
        ),
    };

    return stageComponents[stage] || null;
}
