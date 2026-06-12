
import '@Styles/components/Divider.less';

import {IDividerProps, DividerType} from '@Interfaces/components/IDivider';

export function Divider(props: IDividerProps) {
    let className = 'Divider ';
    let type: DividerType | null = props.type;
    switch (props.type) {
        case DividerType.DOT:
            className += 'dot';
            type = null;
            break;
        case DividerType.LINE:
            className += 'line';
            break;
    }

    return <span className={className}>{type}</span>;
}
