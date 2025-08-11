import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationFooterProps {
   page: number;
   totalPages: number;
   totalItems: number;
   onPageChange: (page: number) => void;
}

export function PaginationFooter({
   page,
   totalPages,
   totalItems,
   onPageChange
}: PaginationFooterProps) {
   const prevDisabled = !!(page === 1);
   const nextDisabled = !!(page >= totalPages);

   const handlePrev = () => {
      if (page > 1) onPageChange(page - 1);
   };

   const handleNext = () => {
      if (page < totalPages) onPageChange(page + 1);
   };

   return (
      <div className="flex justify-between flex-wrap gap-6 items-center border-t pt-4">
         <span className="text-muted-foreground text-sm">
            Total de registros: {totalItems}
         </span>

         <div className="flex items-center gap-2">
            <span className="text-sm mr-3">Página {page} de {totalPages}</span>

            <Button
               onClick={handlePrev}
               disabled={prevDisabled}
               variant={prevDisabled ? 'secondary' : 'default'}
               size="icon"
            >
               <ChevronLeft />
            </Button>

            <Button
               onClick={handleNext}
               disabled={nextDisabled}
               variant={nextDisabled ? 'secondary' : 'default'}
               size="icon"
            >
               <ChevronRight />
            </Button>
         </div>
      </div>
   );
}
