import { GenericService } from "./generic-service";
import type { AssociatedUsers, AssociateForm, Stage } from "@/models/stage";

class StageService extends GenericService<Stage> {
   constructor(){
      super("v1/etapa");
   }

   async vincular(data: AssociateForm){
      const response = await this.axios.post<void>(`${this.path}/vincular`, data)
      return response.data;
   }

   async getVinculados(): Promise<AssociatedUsers[]>{
      const response = await this.axios.get<AssociatedUsers[]>(`${this.path}/vinculados`)
      return response.data;
   }
}

export const stageService = new StageService;