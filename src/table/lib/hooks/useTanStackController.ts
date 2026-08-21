import {useCallback, useMemo} from 'react';
import {getCoreRowModel, useReactTable, type ColumnDef} from '@tanstack/react-table';

import type {CellRenderer, TableConfig} from '../types/column';
import type {HeaderCell, ITableController, TableRow} from '../types/controller';
import {toTanStackColumns} from '../utils/toTanStackColumns';

interface ColumnView {
    label: string;
    width: number | undefined;
    render: CellRenderer | undefined;
}

const FALLBACK_VIEW: ColumnView = {label: '', width: undefined, render: undefined};

export const useTanStackController = <T, >(config: TableConfig<T>, data: T[]): ITableController => {
    const {columns, getRowId} = config;

    const tanStackColumns = useMemo<ColumnDef<T, unknown>[]>(() => toTanStackColumns<T>(columns), [columns]);

    const viewOf = useMemo(() => {
        const byKey = new Map<string, ColumnView>(
            columns.map((column) => [
                column.key,
                {label: column.header, width: column.width, render: column.render},
            ]),
        );

        return (key: string): ColumnView => byKey.get(key) ?? FALLBACK_VIEW;
    }, [columns]);

    const tableInstance = useReactTable<T>({
        data,
        columns: tanStackColumns,
        getCoreRowModel: getCoreRowModel(),
        getRowId,
    });

    const headers = useMemo<HeaderCell[]>(
        () =>
            tableInstance.getHeaderGroups().flatMap((group) =>
                group.headers.map((header) => {
                    const {label, width} = viewOf(header.column.id);

                    return {key: header.column.id, label, width};
                }),
            ),
        [tableInstance, viewOf],
    );

    const rowModel = tableInstance.getRowModel();

    const getRow = useCallback(
        (index: number): TableRow => {
            const sourceRow = rowModel.rows[index];

            if (!sourceRow) {
                throw new RangeError(`There is no string with the index ${index}.`);
            }

            return {
                id: sourceRow.id,
                index: sourceRow.index,
                cells: sourceRow.getVisibleCells().map((cell) => {
                    const {width, render} = viewOf(cell.column.id);
                    const value = cell.getValue();

                    return {
                        key: cell.id,
                        width,
                        content: render ? render({value, index: sourceRow.index}) : String(value ?? ''),
                    };
                }),
            };
        },
        [rowModel, viewOf],
    );

    return {headers, rowCount: rowModel.rows.length, getRow};
};
