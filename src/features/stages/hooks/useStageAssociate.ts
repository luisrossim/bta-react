import { stageService } from '@/features/stages/services/stageService';
import type {
    AssociatedUsers,
    AssociateForm,
    Stage,
} from '@/features/stages/types/Stage';
import { showError } from '@/shared/utils/showMessage';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useStageAssociate() {
    const [stages, setStages] = useState<Stage[]>([]);
    const [associated, setAssociated] = useState<AssociatedUsers[]>([]);
    const [disableActions, setDisableActions] = useState<boolean>(false);

    const fetchStagesAndAssociated = async () => {
        try {
            const [_stages, _associated] = await Promise.all([
                stageService.get(),
                stageService.getVinculados(),
            ]);

            setStages(_stages);
            setAssociated(_associated);
        } catch (err: any) {
            showError(err.message);
        }
    };

    const associate = async (data: AssociateForm) => {
        setDisableActions(true);

        const toastId = toast.loading('Vinculando usuário');

        try {
            await stageService.vincular(data);
            toast.success('Usuário vinculado com sucesso!', { id: toastId });
            fetchStagesAndAssociated();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message, {
                id: toastId,
            });
        } finally {
            setDisableActions(false);
        }
    };

    const disassociate = async (stageId: number, userId: string) => {
        setDisableActions(true);

        const toastId = toast.loading('Desvinculando usuário');

        try {
            await stageService.desvincular({ stageId, userId });
            toast.success('Usuário desvinculado com sucesso!', { id: toastId });
            fetchStagesAndAssociated();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message, {
                id: toastId,
            });
        } finally {
            setDisableActions(false);
        }
    };

    useEffect(() => {
        fetchStagesAndAssociated();
    }, []);

    return {
        associate,
        disassociate,
        associated,
        stages,
        disableActions,
    };
}
