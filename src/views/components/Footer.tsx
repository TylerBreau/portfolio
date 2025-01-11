
import React from 'react';
import '@Styles/components/Footer';
import {Divider} from '@Views/components/Divider';

const EMAIL = 'tylerbreau@hotmail.com';

export class Footer extends React.Component {
    render() {
        return <div className='Footer'>
            <span className='col'>All Rights Reserved &#169;</span>
            <Divider />
            <address className='col'>
                <a className='email' href={`mailto:${EMAIL}`}>{EMAIL} (Preferred)</a>
            </address>
        </div>;
    }
}
