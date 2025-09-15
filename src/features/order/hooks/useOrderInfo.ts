import { type OrderHistory } from '@/features/order/types/OrderHistory';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderQuery } from './useOrderApi';

export function useOrderInfo() {
    const { id } = useParams();
    const [currentOrder, setCurrentOrder] = useState<OrderHistory | null>(null);
    const [pastOrders, setPastOrders] = useState<OrderHistory[]>([]);
    const [orderIsCompleted, setOrderIsCompleted] = useState<boolean>(false);

    const { data: order, isFetching } = useGetOrderQuery(id);

    useEffect(() => {
        if (!order || isFetching) {
            setCurrentOrder(null);
            setPastOrders([]);
            setOrderIsCompleted(false);
            return;
        }

        const [current, ...past] = order.historicoOs;

        setCurrentOrder(current);
        setPastOrders(past);
        setOrderIsCompleted(!!current.concluidoEm);
    }, [order, isFetching]);

    return {
        order,
        currentOrder,
        pastOrders,
        orderIsCompleted,
        isFetching,
    };
}
