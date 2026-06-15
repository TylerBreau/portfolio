
import '@Styles/components/TechnicalArticleTile.less';

import {ITechnicalArticleTileProps} from '@Interfaces/components/ITechnicalArticleTile';

export function TechnicalArticleTile(props: ITechnicalArticleTileProps) {
    return <div className='TechnicalArticleTile' onClick={props.onClick}>
        <span className='title'>{props.title}</span>
        <div className='description'>{props.children}</div>
    </div>;
}
