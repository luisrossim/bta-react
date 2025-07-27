import type { AtribuicaoRequest, CommentsHistory } from "@/models/order-history";
import { axiosInstance } from "@/lib/axios";

class OrderHistoryService {
   protected readonly axios = axiosInstance;
   private path = "v1/orders/history"

   constructor(){}

   async atribuir(data: AtribuicaoRequest) {
      await this.axios.post(`${this.path}/assign-user`, data)
   }

   async desatribuir(data: AtribuicaoRequest) {
      await this.axios.post(`${this.path}/remove-user`, data)
   }

   async concluir(historyId: string) {
      await this.axios.post(`${this.path}/${historyId}/complete`)
   }

   async avancar(historyId: string) {
      await this.axios.post(`${this.path}/${historyId}/advance`)
   }

   async comments(historyId: string, data: CommentsHistory) {
      await this.axios.patch(`${this.path}/${historyId}/comments`, data)
   }
}

export const orderHistoryService = new OrderHistoryService;