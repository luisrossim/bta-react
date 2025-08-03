import { useParams } from "react-router-dom";
import { PageHeader } from "@/shared/components/PageHeader";
import CustomerForm from "../components/CustomerForm";

export default function CreateCustomer(){
   const { id } = useParams();

   const title = id 
      ? "Editar informações do cliente" 
      : "Cadastrar novo cliente";

   return (
      <>
         <PageHeader title={title} />
         <CustomerForm customerId={id} />
      </>
   )
}
