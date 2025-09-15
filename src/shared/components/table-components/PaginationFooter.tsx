import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    onPageChange,
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
        <div className='flex flex-col pt-4'>
            <div className='flex items-center text-sm w-full justify-between gap-2'>
                <p>
                    Página {page} de {totalPages}
                </p>

                <div className='flex items-center gap-3'>
                    <Button
                        onClick={handlePrev}
                        disabled={prevDisabled}
                        variant={prevDisabled ? 'secondary' : 'default'}
                        size='icon'
                    >
                        <ChevronLeft />
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={nextDisabled}
                        variant={nextDisabled ? 'secondary' : 'default'}
                        size='icon'
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>

            <p className='text-muted-foreground text-sm'>
                Total de registros: {totalItems}
            </p>
        </div>
    );
}
