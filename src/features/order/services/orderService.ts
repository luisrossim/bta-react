import type { PaginatedResponse } from '@/shared/types/PaginatedResponse';
import { CrudService } from '../../../shared/services/crudService';
import type { AttachmentWithSignedUrl } from '../types/Attachment';
import type { Assistance, Measurement, Order } from '../types/Order';
import type { OrderPaginated } from '../types/OrderPaginated';

class OrderService extends CrudService<Order> {
    constructor() {
        super('/orders');
    }

    async getOrdersPaginated(
        params?: Record<string, any>
    ): Promise<PaginatedResponse<OrderPaginated>> {
        const response = await this.axios.get<
            PaginatedResponse<OrderPaginated>
        >(this.path, { params });
        return response.data;
    }

    async uploadAttachment(orderId: string, file: any): Promise<void> {
        await this.axios.post(`${this.path}/${orderId}/attachment`, file);
    }

    async viewAttachment(anexoId: string): Promise<AttachmentWithSignedUrl> {
        const response = await this.axios.get(
            `${this.path}/attachment/${anexoId}`
        );
        return response.data;
    }

    async saveMeasurement(orderId: string, values: Measurement) {
        await this.axios.patch(`${this.path}/${orderId}/measurement`, values);
    }

    async saveAssistance(orderId: string, values: Assistance) {
        await this.axios.patch(`${this.path}/${orderId}/assistance`, values);
    }
}

export const orderService = new OrderService();
