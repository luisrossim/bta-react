import { userService } from "@/services/user-service";
import { useEffect, useState } from "react";
import type { User } from "@/models/user";

export function UserList() {
   const [users, setUsers] = useState<User[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      setLoading(true);
      
      userService.getAll()
         .then((res) => setUsers(res))
         .catch((err) => setError(err))
         .finally(() => setLoading(false))
    }, [])

   if(error) {
      return <div className="text-red-500">Erro</div>
   }

   if(loading) {
      return <div>Carregando...</div>
   }

   return (
      <div>
         <p>
            { JSON.stringify(users) }
         </p>
      </div>
   )
}