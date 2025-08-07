import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
   page: number;
   totalPages: number;
   totalItems: number;
   onPageChange: (page: number) => void;
}

export function Pagination({
   page,
   totalPages,
   totalItems,
   onPageChange
}: PaginationProps) {
   const prevDisabled = !!(page === 1);
   const nextDisabled = !!(page >= totalPages);

   const handlePrev = () => {
      if (page > 1) onPageChange(page - 1);
   };

   const handleNext = () => {
      if (page < totalPages) onPageChange(page + 1);
   };

   return (
      <div className="flex justify-between mt-12 border-t pt-6">
         <div className="text-sm text-muted-foreground flex flex-col gap-1">
            <div>Página <NumberAccent value={page} /> de <NumberAccent value={totalPages} /></div>
            <div>Total de registros: <NumberAccent value={totalItems} /></div>
         </div>

         <div className="flex items-center gap-4">
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

const NumberAccent = ({ value }: { value: string | number }) => {
   return <span className="text-primary font-medium">{value}</span>
}