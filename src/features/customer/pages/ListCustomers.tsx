import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerFilter } from "../components/CustomerFilter";
import { CustomerTable } from "../components/CustomerTable";
import { useGetCustomersQuery } from "../hooks/useCustomerApi";
import { Pagination } from "@/shared/components/Pagination";
import { useDebounce } from "@/shared/hooks/useDebounce";

export default function ListCustomers() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search, 500);

    const { data, isFetching } = useGetCustomersQuery(page, debouncedSearch);

    function handleSearchChange(search: string) {
        setSearch(search);
        setPage(1);
    }

    return (
        <div className="space-y-10">
            <PageHeader
                title="Clientes"
                subtitle="Gerencie seus clientes, visualize endereços e acompanhe o histórico de serviços com facilidade."
                action={
                <Button onClick={() => navigate("/sistema/clientes/form")}>
                    <Plus /> Novo cliente
                </Button>
                }
            />

            <CustomerFilter
                search={search}
                onSearch={handleSearchChange}
            />

            <CustomerTable
                customers={data?.data ?? []}
                isFetching={isFetching}
            />

            {data && data.data.length > 0 && (
                <Pagination
                    page={data.page}
                    totalItems={data.total}
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
