import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerFilter } from "../components/CustomerFilter";
import { CustomerTable } from "../components/CustomerTable";
import { useGetCustomersQuery } from "../hooks/useCustomerApi";
import { PaginationFooter } from "@/shared/components/PaginationFooter";
import { useDebounce } from "@/shared/hooks/useDebounce";

export default function ListCustomers() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search, 500);

    const { data: result, isFetching } = useGetCustomersQuery(page, debouncedSearch);

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
                customers={result?.data ?? []}
                isFetching={isFetching}
            />

            {result && result.data.length > 0 && (
                <PaginationFooter
                    page={result.page}
                    totalItems={result.totalItems}
                    totalPages={result.totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
