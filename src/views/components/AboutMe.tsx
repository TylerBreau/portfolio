
import React from 'react';
import '@Styles/components/AboutMe';
import { IAboutMeProps } from '@Interfaces/components/IAboutMe';

export class AboutMe extends React.Component<IAboutMeProps> {
    render() {
        return <div className={'AboutMe' + (this.props.className ? ' ' + this.props.className : '')}>
            <div className='col1 col'>
                <div className='row'>
                    <span className='label'>Name:</span>
                    <span className='value'>Tyler Breau</span>
                </div>
                <div className='row'>
                    <span className='label'>Occupation:</span>
                    <span className='value'>Web and Mobile Developer</span>
                </div>
                <div className='row'>
                    <span className='label list-label'>Traits:</span>
                    <ul className='value'>
                        <li>Straight to the Point</li>
                        <li>Hardworker</li>
                        <li>Perfectionist</li>
                        <li>Considerate</li>
                        <li>Introverted</li>
                        <li>Open-Minded</li>
                    </ul>
                </div>
                <div className='row'>
                    <span className='label'>Motto:</span>
                    <span className='value'>If you are going to do something you mind as well do it right the first time.</span>
                </div>
                <div className='row'>
                    <span className='label'>Education:</span>
                    <span className='value'>2018 Grad of NBCC Moncton, Web and Mobile Application Development Program</span>
                </div>
                <div className='row'>
                    <span className='label'>Notes:</span>
                    <span className='value'>First experienced programming through a highschool Java class. Paid own tuition through Summer Programming Jobs.</span>
                </div>
            </div>
            <img className='col' height='200px' width='300px' />
        </div>;
    }
}
