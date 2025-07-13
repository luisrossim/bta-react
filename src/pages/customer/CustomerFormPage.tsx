import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/page-header";
import CustomerForm from "./components/CustomerForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";


export default function CustomerFormPage(){
   const { id } = useParams();
   const navigate = useNavigate();

   const titleText = id 
      ? "Editar informações do cliente" 
      : "Cadastrar novo cliente";

   const subTitleText = id 
      ? "Altere as informações do cliente existente" 
      : "Preencha as informações do cliente";

   return (
      <div className="space-y-8">
         <Button 
            variant={"outline"} 
            size={"icon"} 
            onClick={() => navigate("/sistema/clientes")}
         >
            <ChevronLeft />
         </Button>

         <PageHeader 
            title={titleText}
            subtitle={subTitleText}
         />

         <CustomerForm id={id} />
      </div>
   )
}
