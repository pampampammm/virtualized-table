import type {TableRow} from '../lib/types/controller';
import {Cell} from './Cell';

export type RowClickHandler = (row: TableRow) => void;

export interface TableRowViewProps {
    row: TableRow;
    selected: boolean;
    onClick: RowClickHandler;
    offsetY: number;
}

export const TableRowView = ({row, selected, onClick, offsetY}: TableRowViewProps) => {
    const highlighted = selected ? ' vtable__row--selected' : '';
    const offsetStyle = {transform: `translateY(${offsetY}px)`};

    return (
        <div
            className={`vtable__row vtable__row--positioned${highlighted}`}
            data-index={row.index}
            style={offsetStyle}
            onClick={() => onClick(row)}
        >
            {row.cells.map((cell) => (
                <Cell key={cell.key} cell={cell}/>
            ))}
        </div>
    );
};
