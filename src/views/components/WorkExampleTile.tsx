
import {Link} from 'react-router-dom';

import '@Styles/components/WorkExampleTile.less';

import {IWorkExampleTileProps} from '@Interfaces/components/IWorkExampleTile';


export function WorkExampleTile(props: IWorkExampleTileProps) {
    return <Link to={props.url}>
        <div className='WorkExampleTile'>
            <span className='title'>{props.title}</span>
            <div className='description'>{props.children}</div>
        </div>
    </Link>;
}
