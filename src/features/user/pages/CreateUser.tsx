import { PageHeader } from "@/shared/components/PageHeader";
import { useParams } from "react-router-dom";
import { UserForm } from "../components/UserForm";


export default function CreateUser(){
   const { id } = useParams();
   
   const titleText = id 
      ? "Editar informações do usuário" 
      : "Cadastrar novo usuário";

   const subTitleText = id 
      ? "Altere as informações do usuário existente" 
      : "Preencha as informações do usuário e defina uma senha de acesso";

   return (
      <>
         <PageHeader 
            title={titleText}
            subtitle={subTitleText}
         />

         <UserForm id={id} />
      </>
   )
}
