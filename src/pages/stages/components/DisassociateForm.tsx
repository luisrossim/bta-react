import { Button } from "@/components/ui/button";
import { Link, Link2Off } from "lucide-react";
import type { Stage } from "@/models/stage";
import type { User } from "@/models/user";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";

interface DisassociateFormProps {
  stage: Stage;
  user: Partial<User>;
  onSubmit: (stageId: number, userId: number) => void;
  disableActions: boolean;
}

export function DisassociateForm({
  stage,
  user,
  onSubmit,
  disableActions,
}: DisassociateFormProps) {
   const handleConfirm = () => {
      onSubmit(stage.id, user.id!);
   };

  return (
    <ConfirmDialog
      onConfirm={handleConfirm}
      disabled={disableActions}
      title="Desvincular usuário?"
      description={`Deseja remover o vínculo de "${user.nome}" da etapa "${stage.descricao}"?`}
      trigger={
        <Button variant="secondary" className="group m-[0.4rem] w-1 h-6">
          <div className="hidden group-hover:block">
            <Link2Off className="text-red-600" />
          </div>
          <div className="block group-hover:hidden">
            <Link className="text-primary" />
          </div>
        </Button>
      }
    />
  );
}
