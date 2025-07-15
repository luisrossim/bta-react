import type { AxiosInstance } from "axios";
import { axiosInstance } from "./axios";
import type { AtribuicaoRequest } from "@/models/service-order-history";

class ServiceOrderHistoryService {
   protected readonly axios: AxiosInstance = axiosInstance;
   private path = "/v1/orders/history"

   constructor(){}

   async atribuir(data: AtribuicaoRequest): Promise<void> {
      await this.axios.post(`${this.path}/assign-user`, data)
   }

   async desatribuir(data: AtribuicaoRequest): Promise<void> {
      await this.axios.post(`${this.path}/remove-user`, data)
   }

   async concluir(historyId: string): Promise<void> {
      await this.axios.post(`${this.path}/${historyId}/complete`)
   }

   async avancar(historyId: string): Promise<void> {
      await this.axios.post(`${this.path}/${historyId}/advance`)
   }
}

export const serviceOrderHistoryService = new ServiceOrderHistoryService;