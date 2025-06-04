import type { CreateUser, User } from "@/models/user";
import { GenericService } from "./generic-service";

class UserService extends GenericService<User> {
    constructor(){
        super("v1/role");
    }

    async createWithRole(data: CreateUser): Promise<User>{
        const response = await this.axios.post<User>(this.path, data)
        return response.data;
    }

    async getByRole(role: string): Promise<User> {
        const response = await this.axios.get<User>(this.path, { params: { role } })
        return response.data;
    }
}

export const userService = new UserService;