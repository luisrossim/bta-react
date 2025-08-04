import { PageHeader } from "@/shared/components/PageHeader";
import { useParams } from "react-router-dom"
import { CustomerInfo } from "../components/CustomerInfo";

export default function ViewCustomer() {
   const { id } = useParams();

   return (
      <div>
         <PageHeader title="Informações do cliente"/>
         <CustomerInfo customerId={id} />
      </div>
   )
}
