import { PageHeader } from "@/shared/components/PageHeader";
import { useParams } from "react-router-dom"
import { CustomerInfo } from "../components/CustomerInfo";

export default function ViewCustomer() {
   const { id } = useParams();

   return (
      <div className="space-y-6">
         <PageHeader 
            title="Informações do cliente"
            subtitle="Visualize os dados do cliente, incluindo endereço e ordens de serviços vinculadas."
         />

         <CustomerInfo customerId={id} />
      </div>
   )
}
