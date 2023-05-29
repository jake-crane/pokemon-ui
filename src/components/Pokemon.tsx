import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { usePokemonQuery } from '../hooks/usePokemonQuery';
import type { PokemonResponse } from '../schemas/pokemonResponseSchema';
import PokemonDetailsModal from './PokemonDetailsModal';
import TableComponent from './TableComponent';

const columnHelper = createColumnHelper<PokemonResponse['results'][number]>();

const Pokemon = (): JSX.Element => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [urlToView, setUrlToView] = useState<string | null>(null);
    const { data } = usePokemonQuery(limit, offset);

    const tableData = useMemo(() => data?.results ?? [], [data?.results]);

    const columns = [
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('url', {
            header: 'View Details',
            cell: ({ cell }) => (
                <Button variant="contained" onClick={() => setUrlToView(cell.getValue())}>
                    View
                </Button>
            )
        })
    ];

    const table = useReactTable({
        columns,
        data: tableData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        state: {
            pagination: {
                pageIndex: offset,
                pageSize: limit
            }
        }
    });

    const currentPage = data?.count && data.count > 0 ? offset : 0;

    return (
        <Container maxWidth="md">
            <PokemonDetailsModal url={urlToView} onClose={() => setUrlToView(null)} />
            <h1>Pokemon</h1>
            <TableContainer component={Paper}>
                <TableComponent table={table} />
            </TableContainer>
            <Stack>
                <TablePagination
                    component="div"
                    count={data?.count ?? 0}
                    page={currentPage}
                    onPageChange={(_, page) => setOffset(page)}
                    rowsPerPage={limit}
                    onRowsPerPageChange={e => setLimit(Number(e.target.value))}
                />
            </Stack>
        </Container>
    );
};

export default Pokemon;
