import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DropdownActions } from '@/shared/components/table-components/DropdownActions';
import { LoadingIcon } from '../LoadingIcon';
import { EmptyTable } from './EmptyTable';

type DropdownAction = {
    label: string;
    destructive?: boolean;
    onClick: () => void;
};

export type Column<T> = {
    header: string;
    render: (row: T) => React.ReactNode;
    className?: string;
};

interface GenericTableProps<T> {
    data?: T[];
    columns: Column<T>[];
    loading: boolean;
    getRowId?: (row: T) => string | number;
    actions?: (row: T) => DropdownAction[];
}

export function GenericTable<T>({
    data = [],
    columns,
    loading,
    getRowId = (row: any) => row.id,
    actions,
}: GenericTableProps<T>) {
    if (!data || data.length === 0) return <EmptyTable />;

    if (loading) return <LoadingIcon />;

    return (
        <Table className='table-striped'>
            <TableHeader>
                <TableRow>
                    {actions && <TableHead className='w-[30px]'></TableHead>}

                    {columns.map((col, index) => (
                        <TableHead key={index} className={col.className}>
                            {col.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={getRowId(row)}>
                        {actions && (
                            <TableCell className='flex gap-2 items-center justify-end'>
                                <DropdownActions actions={actions(row)} />
                            </TableCell>
                        )}

                        {columns.map((col, index) => (
                            <TableCell key={index} className={col.className}>
                                {col.render(row)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
