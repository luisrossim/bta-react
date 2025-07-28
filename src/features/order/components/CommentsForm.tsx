import { Button } from "@/components/ui/button";
import { commentsHistorySchema, type CommentsHistory } from "@/features/order/types/OrderHistory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

interface CommentsFormProps {
   observacoes?: string;
   onSubmit: (values: CommentsHistory) => void;
}

export function CommentsForm({ 
   observacoes,
   onSubmit 
}: CommentsFormProps) {
   const form = useForm<CommentsHistory>({
      resolver: zodResolver(commentsHistorySchema),
      defaultValues: { observacoes }
   });

   useEffect(() => {
      form.reset({ observacoes })
   }, [observacoes])

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
               control={form.control}
               name="observacoes"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Textarea
                           placeholder="Nada informado"
                           className="min-h-[100px] rounded-[12px]"
                           {...field}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            {form.formState.isDirty && (
               <div className="flex justify-end gap-2">
                  <Button type="submit" variant={"success"}>
                     Salvar observações
                  </Button>
               </div>
            )}
         </form>
      </Form>
   )
}
