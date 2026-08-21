import {createContext, useContext} from 'react';

import type {ITableController} from '../lib/types/controller';

const TableContext = createContext<ITableController | null>(null);

export const TableContextProvider = TableContext.Provider;

export const useTableController = (): ITableController => {
    const controller = useContext(TableContext);

    if (!controller)
        throw new Error('The table component must be used inside <Table>');

    return controller;
};
