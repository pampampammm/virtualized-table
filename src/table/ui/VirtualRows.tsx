import {useRef} from 'react';
import {useVirtualizer} from '@tanstack/react-virtual';

import type {TableRow} from '../lib/types/controller';
import {useTableController} from './TableContext';
import {TableRowView, type RowClickHandler} from './TableRowView';

const DEFAULT_ROW_HEIGHT = 40;
const DEFAULT_OVERSCAN = 8;

export interface VirtualRowsProps {
    onRowClick: RowClickHandler;
    isRowSelected: (row: TableRow) => boolean;
    rowHeight?: number;
    overscan?: number;
}

export const VirtualRows = ({
                                onRowClick,
                                isRowSelected,
                                rowHeight = DEFAULT_ROW_HEIGHT,
                                overscan = DEFAULT_OVERSCAN,
                            }: VirtualRowsProps) => {
    const {rowCount, getRow} = useTableController();
    const scrollRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        getScrollElement: () => scrollRef.current,
        count: rowCount,
        estimateSize: () => rowHeight,
        overscan,
    });

    const canvasStyle = {height: virtualizer.getTotalSize()};

    const visibleRows = virtualizer.getVirtualItems().map((virtualRow) => ({
        row: getRow(virtualRow.index),
        offsetY: virtualRow.start,
    }));

    return (
        <div className="vtable__body" ref={scrollRef}>
            <div className="vtable__canvas" style={canvasStyle}>
                {visibleRows.map(({row, offsetY}) => (
                    <TableRowView
                        key={row.id}
                        row={row}
                        offsetY={offsetY}
                        selected={isRowSelected(row)}
                        onClick={onRowClick}
                    />
                ))}
            </div>
        </div>
    );
};
