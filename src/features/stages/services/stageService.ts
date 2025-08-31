import type {
    AssociatedUsers,
    AssociateForm,
    Stage,
} from '@/features/stages/types/Stage';
import { CrudService } from '../../../shared/services/crudService';

class StageService extends CrudService<Stage> {
    constructor() {
        super('/stages');
    }

    async vincular(data: AssociateForm) {
        const response = await this.axios.post<void>(
            `${this.path}/associate`,
            data
        );
        return response.data;
    }

    async desvincular(data: AssociateForm): Promise<void> {
        await this.axios.post(`${this.path}/disassociate`, data);
    }

    async getVinculados(): Promise<AssociatedUsers[]> {
        const response = await this.axios.get<AssociatedUsers[]>(
            `${this.path}/associated`
        );
        return response.data;
    }
}

export const stageService = new StageService();
