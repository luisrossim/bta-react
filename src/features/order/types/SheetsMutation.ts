import type { Assistance, Measurement } from './Order';

export interface MeasurementMutation {
    orderId: string;
    values: Measurement;
}

export interface AssistanceMutation {
    orderId: string;
    values: Assistance;
}
