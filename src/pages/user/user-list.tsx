import { userService } from "@/services/user-service";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "@/components/loading";
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

   if(loading) return <LoadingWrapper />

   return (
      <div>
         { users.map((user) => (
            <p key={user.id}>{user.nome}</p>
         )) }
      </div>
   )
}