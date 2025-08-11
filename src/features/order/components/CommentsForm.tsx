import { Button } from "@/components/ui/button";
import { commentsHistorySchema, type CommentsHistory } from "@/features/order/types/OrderHistory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface CommentsFormProps {
   observacoes?: string;
   onSubmit: (values: CommentsHistory) => void;
}

export function CommentsForm({ 
   observacoes,
   onSubmit 
}: CommentsFormProps) {
   const [edit, setEdit] = useState(true);

   const form = useForm<CommentsHistory>({
      resolver: zodResolver(commentsHistorySchema),
      defaultValues: { observacoes }
   });

   const resetForm = () => {
      form.reset({ observacoes })
   }

   useEffect(() => {
      resetForm();
   }, [observacoes])

   return (
      <Form {...form}>
         <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
         >
            <FormField
               control={form.control}
               name="observacoes"
               disabled={edit}
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Textarea
                           placeholder="Nada informado"
                           className="min-h-[100px] rounded-[12px] text-sm"
                           {...field}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="flex justify-end gap-2">
               {edit 
                  ? (
                     <Button 
                        type="button"
                        onClick={() => setEdit(false)}
                     >
                        Editar observações
                     </Button>
                  ) 
                  : (
                     <>
                        <Button 
                           type="button" 
                           variant={"outline"}
                           onClick={() => {
                              resetForm();
                              setEdit(true);
                           }}
                        >
                           Cancelar
                        </Button>

                        <Button 
                           type="submit" 
                           variant={"dark"}
                        >
                           Salvar observações
                        </Button>
                     </>
                  )
               }
            </div>
         </form>
      </Form>
   )
}
