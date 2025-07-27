import { CrudService } from "../../../shared/services/crudService";
import type { Customer } from "@/features/customer/types/Customer";

class CustomerService extends CrudService<Customer> {
    constructor(){
        super("v1/customers");
    }
}

export const customerService = new CustomerService;