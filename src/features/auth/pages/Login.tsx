import { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/LoginContainer";

export default function Login() {
   const { isAuthenticated } = useAuthContext();
   const navigate = useNavigate();
   
   useEffect(() => {
      if (isAuthenticated) {
         navigate('/sistema');
      }
   }, [isAuthenticated]);

   return (
      <LoginContainer 
         form={<LoginForm />}
      />
   );
}
