import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownActions } from "@/shared/components/DropdownActions";

type DropdownAction = {
   label: string
   onClick: () => void
}

export type Column<T> = {
   header: string;
   render: (row: T) => React.ReactNode;
   className?: string;
};

interface GenericTableProps<T> {
   data: T[];
   columns: Column<T>[];
   getRowId?: (row: T) => string | number;
   actions?: (row: T) => DropdownAction[];
}

export function GenericTable<T>({
   data,
   columns,
   getRowId = (row: any) => row.id,
   actions,
}: GenericTableProps<T>) {
   return (
      <Table className="table-striped">
         <TableHeader>
            <TableRow>
               {columns.map((col, index) => (
                  <TableHead 
                     key={index} 
                     className={col.className}
                  >
                     {col.header}
                  </TableHead>
               ))}
               {actions && <TableHead className="text-right">Ações</TableHead>}
            </TableRow>
         </TableHeader>
         <TableBody>
            {data.map((row) => (
               <TableRow key={getRowId(row)}>
                  {columns.map((col, index) => (
                     <TableCell 
                        key={index} 
                        className={col.className}
                     >
                        {col.render(row)}
                     </TableCell>
                  ))}
                  {actions && (
                     <TableCell className="flex gap-2 items-center justify-end">
                        <DropdownActions actions={actions(row)} />
                     </TableCell>
                  )}
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
}
