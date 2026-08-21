import {HeadCell} from './HeadCell';
import {useTableController} from './TableContext';

export const TableHead = () => {
    const {headers} = useTableController();

    return (
        <div className="vtable__head">
            <div className="vtable__row">
                {headers.map((header) => (
                    <HeadCell key={header.key} header={header}/>
                ))}
            </div>
        </div>
    );
};
