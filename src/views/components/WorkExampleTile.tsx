
import '@Styles/components/WorkExampleTile.less';

import {IWorkExampleTileProps} from '@Interfaces/components/IWorkExampleTile';

export function WorkExampleTile(props: IWorkExampleTileProps) {
    return <div className='WorkExampleTile' onClick={props.onClick}>
        <span className='title'>{props.title}</span>
        <div className='description'>{props.children}</div>
    </div>;
}
