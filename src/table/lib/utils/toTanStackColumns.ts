import {type ColumnDef} from '@tanstack/react-table';

import {isComputedColumn, type ColumnSpec} from '../types/column';

const defaultAccessor =
    <T, >(key: string) =>
        (row: T) =>
            (row as Record<string, unknown>)[key];

const toTanStackColumn = <T, >(column: ColumnSpec<T>): ColumnDef<T, unknown> => ({
    id: column.key,
    accessorFn: isComputedColumn(column) ? column.accessor : defaultAccessor(column.key),
});

export const toTanStackColumns = <T, >(columns: ReadonlyArray<ColumnSpec<T>>): ColumnDef<T, unknown>[] =>
    columns.map(toTanStackColumn);
