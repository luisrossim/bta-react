import type { AssociatedUsers, AssociateForm, Stage } from "@/models/stage";
import type { User } from "@/models/user";
import { stageService } from "@/services/stage-service";
import { userService } from "@/services/user-service";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function useStageAssociate() {
   const [stages, setStages] = useState<Stage[]>([]);
   const [associated, setAssociated] = useState<AssociatedUsers[]>([]);
   const [users, setUsers] = useState<User[]>([]);
   const [disableActions, setDisableActions] = useState<boolean>(false);

   const fetchStagesAndAssociated = async () => {
      try {
         const [_stages, _associated, _users] = await Promise.all([
            stageService.getAll(),
            stageService.getVinculados(),
            userService.getAll()
         ])

         setStages(_stages)
         setAssociated(_associated)
         setUsers(_users)

      } catch (err: any) {
         //ToastService.showError(err?.response?.data?.message || err?.message)
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