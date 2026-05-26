
import '@Styles/components/Footer.less';

import {DividerType} from '@Interfaces/components/IDivider';

import {Divider} from '@Views/components/Divider';

const EMAIL = 'tylerbreau@hotmail.com';

export function Footer() {
    return <div className='Footer'>
        <span className='col'>All Rights Reserved &#169;</span>
        <Divider type={DividerType.DOT} />
        <address className='col'>
            <a className='email' href={`mailto:${EMAIL}`}>{EMAIL} (Preferred)</a>
        </address>
    </div>;
}
