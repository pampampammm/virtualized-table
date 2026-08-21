import {useMemo} from 'react';

import {generateItems} from './lib/utils/generateItems';
import {useSelectedRow} from './hooks/useSelectedRow';
import {Table, useTanStackController, VirtualRows, type TableConfig} from './table';
import type {Item} from './lib/types/item';

const ROW_COUNT = 100_000;
const ROW_HEIGHT = 41;

const itemsTable: TableConfig<Item> = {
    getRowId: (item) => String(item.id),
    columns: [
        {key: 'rowNumber', header: '№', width: 90, accessor: () => null, render: ({index}) => index + 1},
        {key: 'id', header: 'ID', width: 90},
        {key: 'text', header: 'Текст'},
    ],
};

const App = () => {
    const items = useMemo(() => generateItems(ROW_COUNT), []);

    const table = useTanStackController(itemsTable, items);
    const {selectedId, select} = useSelectedRow();

    return (
        <main className="page">
            <h2>Виртуализированная таблица</h2>

            <Table table={table}>
                <Table.Head/>
                <VirtualRows
                    rowHeight={ROW_HEIGHT}
                    onRowClick={(row) => select(row.id)}
                    isRowSelected={(row) => row.id === selectedId}
                />
            </Table>
        </main>
    );
};

export default App;
