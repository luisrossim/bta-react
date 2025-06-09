import type { ServiceOrder } from "@/models/service-order";
import { GenericService } from "./generic-service";

class ServiceOrderService extends GenericService<ServiceOrder> {
   constructor(){
      super("v1/orders");
   }
}

export const serviceOrderService = new ServiceOrderService;