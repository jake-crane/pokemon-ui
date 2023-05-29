import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Table as ReactTable, RowData } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

interface ComponentProps<TData> {
    table: ReactTable<TData>;
}

const TableComponent = <TData extends RowData>({ table }: ComponentProps<TData>) => (
    <Table>
        <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <TableCell key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableHead>
        <TableBody>
            {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default TableComponent;
