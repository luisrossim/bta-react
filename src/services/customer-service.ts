import { GenericService } from "./generic-service";
import type { Customer } from "@/models/customer";

class CustomerService extends GenericService<Customer> {
    constructor(){
        super("v1/customers");
    }

    async getByCPF(cpf: string): Promise<Customer> {
        const response = await this.axios.get<Customer>(this.path, { params: { cpf } })
        return response.data;
    }
}

export const customerService = new CustomerService;