import type {ReactNode} from 'react';

import type {ITableController} from '../lib/types/controller';
import {TableContextProvider} from './TableContext';
import {TableHead} from './TableHead';

export interface TableProps {
    table: ITableController;
    children: ReactNode;
}

export const Table = ({table, children}: TableProps) => (
    <TableContextProvider value={table}>
        <div className="vtable">{children}</div>
    </TableContextProvider>
);

Table.Head = TableHead;
