import { Button } from "@/components/ui/button";
import { commentsHistorySchema, type CommentsHistory } from "@/models/order-history";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

interface CommentsHistoryFormProps {
   observacoes?: string;
   onSubmit: (values: CommentsHistory) => void;
}

export function CommentsHistoryForm({ observacoes, onSubmit }: CommentsHistoryFormProps) {
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
                     <FormLabel>Observações</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Digite observações sobre a etapa"
                           className="min-h-[100px]"
                           {...field}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="flex justify-end gap-2">
               <Button 
                  type="submit" 
                  size={"sm"} 
                  variant={"dark"} 
                  disabled={!form.formState.isDirty}
               >
                  Salvar observações
               </Button>
            </div>
         </form>
      </Form>
   )
}
