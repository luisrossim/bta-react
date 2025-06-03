import { userService } from "@/services/user-service";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading-animation";
import type { User } from "@/models/user";
import { toast } from "sonner";

export function UserList() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      setLoading(true);
      
      userService.getAll()
         .then((res) => setUsers(res))
         .catch((err) => toast.error(err.response?.data.message || err.message))
         .finally(() => setLoading(false))
    }, [])

   if(loading) return <Loading />

   return (
      <div>
         { users.map((user) => (
            <p>{user.nome}</p>
         )) }
      </div>
   )
}