import type { AssociatedUsers, AssociateForm, Stage } from "@/features/stages/types/Stage";
import type { User } from "@/features/user/types/User";
import { stageService } from "@/features/stages/services/stageService";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { userService } from "@/features/user/services/userService";
import { showError } from "@/shared/utils/showMessage";

export function useStageAssociate() {
   const [stages, setStages] = useState<Stage[]>([]);
   const [associated, setAssociated] = useState<AssociatedUsers[]>([]);
   const [users, setUsers] = useState<User[]>([]);
   const [disableActions, setDisableActions] = useState<boolean>(false);

   const fetchStagesAndAssociated = async () => {
      try {
         const [_stages, _associated, _users] = await Promise.all([
            stageService.get(),
            stageService.getVinculados(),
            userService.get()
         ])

         setStages(_stages)
         setAssociated(_associated)
         setUsers(_users)

      } catch (err: any) {
         showError(err.message);
      }
   }


   const associate = async (data: AssociateForm) => {
      setDisableActions(true);

      const toastId = toast.loading("Vinculando usuário");

      try {
         await stageService.vincular(data);
         toast.success("Usuário vinculado com sucesso!", { id: toastId });
         fetchStagesAndAssociated();

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }


   const disassociate = async (stageId: number, userId: number) => {
      setDisableActions(true);

      const toastId = toast.loading("Desvinculando usuário");

      try {
         await stageService.desvincular({stageId, userId});
         toast.success("Usuário desvinculado com sucesso!", { id: toastId });
         fetchStagesAndAssociated();

      } catch (err: any) {
         toast.error(err?.response?.data?.message || err?.message, { id: toastId });
      } finally {
         setDisableActions(false);
      }
   }

   const stageOptions = useMemo(
      () =>
         stages.map((stage) => ({
            value: stage.id,
            label: stage.descricao,
         })),
      [stages]
   );

   const userOptions = useMemo(
      () =>
         users.map((user) => ({
            value: user.id,
            label: user.nome,
         })),
      [users]
   );

   useEffect(() => {
     fetchStagesAndAssociated()
   }, [])

   return {
      associate,
      disassociate,
      associated,
      stages,
      stageOptions,
      userOptions,
      disableActions
   }
}