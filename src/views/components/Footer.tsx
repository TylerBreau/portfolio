
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
            <Divider type={DividerType.DOT} />
            <a
                className='linkedin'
                href='https://www.linkedin.com/in/tyler-breau/'
                rel='external noreferrer'
                target='_blank'
            ><img height="19" src='./LinkedInLogo.png' /></a>            
        </address>
    </div>;
}
