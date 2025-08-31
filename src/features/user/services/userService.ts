import type { User } from '@/features/user/types/User';
import { CrudService } from '@/shared/services/crudService';

class UserService extends CrudService<User> {
    constructor() {
        super('/users');
    }

    async getByRole(role: string): Promise<User> {
        const response = await this.axios.get<User>(this.path, {
            params: { role },
        });
        return response.data;
    }

    async changeStatus(userId: number) {
        const response = await this.axios.patch(
            `${this.path}/${userId}/status`
        );
        return response.data;
    }
}

export const userService = new UserService();
