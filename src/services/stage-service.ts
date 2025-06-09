import { GenericService } from "./generic-service";
import type { AssociatedUsers, AssociateForm, Stage } from "@/models/stage";

class StageService extends GenericService<Stage> {
   constructor(){
      super("v1/stages");
   }

   async vincular(data: AssociateForm){
      const response = await this.axios.post<void>(`${this.path}/associate`, data)
      return response.data;
   }

   async desvincular(data: AssociateForm): Promise<void> {
      await this.axios.post(`${this.path}/disassociate`, data)
   }

   async getVinculados(): Promise<AssociatedUsers[]>{
      const response = await this.axios.get<AssociatedUsers[]>(`${this.path}/associated`)
      return response.data;
   }
}

export const stageService = new StageService;