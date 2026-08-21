import type {ReactNode} from 'react';

export interface TableCell {
    key: string;
    width: number | undefined;
    content: ReactNode;
}

export interface TableRow {
    id: string;
    index: number;
    cells: TableCell[];
}

export interface HeaderCell {
    key: string;
    label: string;
    width: number | undefined;
}

export interface ITableController {
    readonly headers: ReadonlyArray<HeaderCell>;
    readonly rowCount: number;

    getRow(index: number): TableRow;
}
