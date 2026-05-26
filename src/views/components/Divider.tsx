
import '@Styles/components/Divider.less';

import {IDividerProps, DividerType} from '@Interfaces/components/IDivider';

export function Divider(props: IDividerProps) {
    let className = 'Divider ';
    switch (props.type) {
        case DividerType.DOT:
            className += 'dot';
            break;
        case DividerType.LINE:
            className += 'line';
            break;
    }

    return <span className={className}>{props.type}</span>;
}
