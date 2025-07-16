import type { ServiceOrder } from "@/models/service-order";
import { GenericService } from "./generic-service";

class ServiceOrderService extends GenericService<ServiceOrder> {
   constructor(){
      super("v1/orders");
   }

   async uploadAttachment(orderId: string, file: any): Promise<void> {
      await this.axios.post(`${this.path}/${orderId}/attachment`, file)
   }
}

export const serviceOrderService = new ServiceOrderService;