import { PageHeader } from "@/shared/components/PageHeader";
import { useParams } from "react-router-dom";
import { UserForm } from "../components/UserForm";


export default function CreateUser(){
   const { id } = useParams();
   
   const titleText = id 
      ? "Editar informações do usuário" 
      : "Cadastrar novo usuário";

   return (
      <>
         <PageHeader title={titleText}/>
         <UserForm id={id} />
      </>
   )
}
