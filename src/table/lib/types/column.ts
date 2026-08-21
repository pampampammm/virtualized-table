import type {ReactNode} from 'react';

export interface CellContext {
    value: unknown;
    index: number;
}

export type CellRenderer = (context: CellContext) => ReactNode;

interface ColumnBase {
    header: string;
    render?: CellRenderer;
    width?: number;
}

export interface FieldColumn<T> extends ColumnBase {
    key: Extract<keyof T, string>;
}

export interface ComputedColumn<T> extends ColumnBase {
    key: string;
    accessor: (row: T) => unknown;
}

export type ColumnSpec<T> = FieldColumn<T> | ComputedColumn<T>;

export const isComputedColumn = <T, >(column: ColumnSpec<T>): column is ComputedColumn<T> =>
    'accessor' in column;

export interface TableConfig<T> {
    columns: ColumnSpec<T>[];
    getRowId: (row: T) => string;
}
