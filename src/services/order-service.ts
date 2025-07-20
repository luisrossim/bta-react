import type { Order } from "@/models/order";
import { GenericService } from "./generic-service";
import type { AttachmentWithSignedUrl } from "./attachment";

class OrderService extends GenericService<Order> {
   constructor(){
      super("v1/orders");
   }

   async uploadAttachment(orderId: string, file: any): Promise<void> {
      await this.axios.post(`${this.path}/${orderId}/attachment`, file)
   }

   async viewAttachment(anexoId: string): Promise<AttachmentWithSignedUrl> {
      const response = await this.axios.get(`${this.path}/attachment/${anexoId}`);
      return response.data
   }
}

export const orderService = new OrderService;