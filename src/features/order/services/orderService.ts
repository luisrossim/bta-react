import { CrudService } from "../../../shared/services/crudService";
import type { AttachmentWithSignedUrl } from "../types/Attachment";
import type { Assistance, Measurement, Order } from "../types/Order";

class OrderService extends CrudService<Order> {
   constructor(){
      super("v1/orders");
   }

   async uploadAttachment(orderId: string, file: any): Promise<void> {
      await this.axios.post(`${this.path}/${orderId}/attachment`, file)
   }

   async viewAttachment(anexoId: string): Promise<AttachmentWithSignedUrl> {
      const response = await this.axios.get(`${this.path}/attachment/${anexoId}`);
      return response.data;
   }

   async saveMeasurement(orderId: string, values: Measurement) {
      await this.axios.patch(`${this.path}/${orderId}/measurement`, values);
   }

   async saveAssistance(orderId: string, values: Assistance) {
      await this.axios.patch(`${this.path}/${orderId}/assistance`, values);
   }
}

export const orderService = new OrderService;