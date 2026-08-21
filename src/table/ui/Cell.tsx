import {getCellClassname} from '../lib/utils/getCellClassname';
import type {TableCell} from '../lib/types/controller';

export const Cell = ({cell}: { cell: TableCell }) => {
    const widthStyle = {width: cell.width};

    return (
        <div className={getCellClassname(cell.width)} style={widthStyle}>
            {cell.content}
        </div>
    );
};
