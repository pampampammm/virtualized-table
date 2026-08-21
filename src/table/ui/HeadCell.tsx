import type {HeaderCell} from '../lib/types/controller';
import {getCellClassname} from '../lib/utils/getCellClassname';

export const HeadCell = ({header}: { header: HeaderCell }) => {
    const widthStyle = {width: header.width};

    return (
        <div className={getCellClassname(header.width)} style={widthStyle}>
            {header.label}
        </div>
    );
};
