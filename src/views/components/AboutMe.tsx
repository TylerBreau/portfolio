import React from 'react';
import '@Styles/components/AboutMe';
import {AboutMeLogic} from '@Logic/components/AboutMeLogic';
import {
    IAboutMe,
    IAboutMeProps
} from '@Interfaces/components/IAboutMe';

export class AboutMe extends React.Component<IAboutMeProps, {}> implements IAboutMe {
    private $logic: AboutMeLogic;

    constructor(props: never) {
        super(props);

        this.$logic = new AboutMeLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            <div className='col1 col'>
                <p>
                    <span className='name'>Tyler Breau</span>
                    <br />
                    <span className='occupation'>Web and Mobile Developer</span>
                    <br />
                    <span className='motto'>- &ldquo;If you are going to do something you mind as well do it right the first time.&rdquo;</span>
                </p>
                <br/>
                <br/>
                <br/>
                <span className='education'>2018 Grad of NBCC Moncton, Web and Mobile Application Development Program</span>
                <ul className='value'>
                    <li>Straight to the Point</li>
                    <li>Hardworker</li>
                    <li>Perfectionist</li>
                    <li>Considerate</li>
                    <li>Introverted</li>
                    <li>Open-Minded</li>
                </ul>
            </div>
            <img className='col' height='200px' width='300px' />
        </div>;
    }
}
