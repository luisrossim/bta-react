import type { User } from "@/models/user";
import { GenericService } from "./generic-service";

class UserService extends GenericService<User> {
    constructor(){
        super("v1/usuario");
    }

    async getByRole(role: string): Promise<User> {
        const response = await this.axios.get<User>(this.path, { params: { role } })
        return response.data;
    }

    async changeStatus(userId: number) {
        const response = await this.axios.patch(`${this.path}/${userId}/status`)
        return response.data;
    }
}

export const userService = new UserService;