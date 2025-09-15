import type { Customer, CustomerRaw } from '@/features/customer/types/Customer';
import { CrudService } from '../../../shared/services/crudService';

class CustomerService extends CrudService<Customer> {
    constructor() {
        super('/customers');
    }

    async getAll(): Promise<CustomerRaw[]> {
        const result = await this.axios.get<CustomerRaw[]>(`${this.path}/raw`);
        return result.data;
    }
}

export const customerService = new CustomerService();
