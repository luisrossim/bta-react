import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import CustomerForm from "./components/CustomerForm";


export default function CustomerFormPage(){
   const { id } = useParams();

   const titleText = id 
      ? "Editar informações do cliente" 
      : "Cadastrar novo cliente";

   const subTitleText = id 
      ? "Altere as informações do cliente existente" 
      : "Preencha as informações do cliente";

   return (
      <div className="space-y-8">
         <PageHeader 
            title={titleText}
            subtitle={subTitleText}
         />

         <CustomerForm id={id} />
      </div>
   )
}
