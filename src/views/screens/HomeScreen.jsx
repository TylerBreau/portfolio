
import React from 'react';
import '@Styles/screens/HomeScreen';
import {HomeScreenLogic} from '@Logic/screens/HomeScreenLogic';
import {SlideShow} from '@Views/components/SlideShow';
import {Divider} from '@Views/components/Divider';
import {WorkExample} from '@Views/components/WorkExample';

const EMAIL = 'tylerbreau@hotmail.com';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.$logic = new HomeScreenLogic(this);
    }

    render() {
        /*
            1-About Me
            introduce myself
                include what my job and summarized expertise is (1 sentence for expertise)

            include some kind of origin statement of why i got into programming, says something about my personality

            2-work biography
            brief description of what my expertise is

            3-work examples
                brief overviews of work examples, more detailed info can be on other pages. Maybe useNavigation hook will be used afterall?

            4-contact information

            UI plan?
            slideshow with arrows on each side, infinite looping.
            header above with a separate, maybe circle dots? Header should be clickable to skip to that view.
        */
        return <div className={this.$logic.getClassName()}>
            <SlideShow
                items={[
                    {
                        title: 'About Me',
                        render: () => {
                            return <div className='slideshow-content aboutMe' key='aboutMe'>
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
                    },
                    {
                        title: 'Work Biography',
                        render: () => {
                            return <div className='slideshow-content biography' key='biography'>
                                <div className='entry summary'>
                                    <div className='row'>
                                        <span className='label'>Experience Summary</span>
                                    </div>
                                    <div className='row notes'>
                                        <span className='label'>My work experience is focused on:</span>
                                        <ul>
                                            <li>React JS + JSX</li>
                                            <li>Cordova (including various mobile features such as accelerometer and geolocation)</li>
                                            <li>Node + TypeScript</li>
                                            <li>MySQL</li>
                                            <li>HTML + CSS + JavaScript</li>
                                            <li>Less</li>
                                            <li>SQLite</li>
                                            <li>Flux Architecture + OOP Design</li>
                                        </ul>
                                        <span className='label'>I also have work experience in:</span>
                                        <ul>
                                            <li>PHP</li>
                                            <li>PHP Mailer</li>
                                            <li>TCPDF Library</li>
                                            <li>D3 (Data-Driven Documents) Library</li>
                                            <li>Cordova Plugin Development (Native Android and iOS)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='entry'>
                                    <div className='row title-timeframe'>
                                        <span className='label'>Web and Mobile Developer</span>
                                        <span className='timeframe'>May 22, 2018-Present</span>
                                    </div>
                                    <span className='row company'>TotalPave</span>
                                    <span className='row location'>Fredericton, NB</span>
                                    <div className='row notes'>
                                        <ul>
                                            <li><b>Worked</b> with React JS, Cordova, Node, TypeScript, Less, and Webpack to build and maintain the company&apos;s websites, mobile apps, and backend systems.</li>
                                            <li><b>Used</b> the Smart Phone features, Accelerometer, Geolocation, Camera, SQLite, and GoogleMaps APIs for iOS 9+ and Android 4.1+.</li>
                                            <li><b>Generated</b> and <b>provided</b> charts and graphs using D3 (Data Driven Documents) library.</li>
                                            <li><b>Designed</b> mobile apps and websites using Flux Architecture and OOP design patterns.</li>
                                            <li><b>Followed</b> existing coding guidelines and wrote re-usable APIs.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='entry'>
                                    <div className='row title-timeframe'>
                                        <span className='label'>Web and Mobile Developer</span>
                                        <span className='timeframe'>Summer 2016-2017</span>
                                    </div>
                                    <span className='row company'>Neil Squire Society</span>
                                    <span className='row location'>Moncton, NB</span>
                                    <div className='row notes'>
                                        <ul>
                                            <li><b>Worked</b> with HTML, CSS, JavaScript, PHP, and MySQL to build a website on an Apache server with MariaDB. I also used the PuTTy, HeidiSQL, PHPMyAdmin, and WinSCP tools while building the website.</li>
                                            <li><b>Supported</b> Assistive Technology and browsers as old as IE 9 throughout the website.</li>
                                            <li><b>Implemented</b> automated emails with PHP Mailer.</li>
                                            <li><b>Generated</b> and <b>provided</b> downloadable PDFs with the TCPDF Library.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>;
                        }
                    },
                    {
                        title: 'Work Examples',
                        render: () => {
                            return <div className='slideshow-content examples' key='examples'>
                                <WorkExample
                                    title='Flux Architecture'
                                    url='fluxarchitecture'
                                >
                                    <span>Lesson on Flux Architecture</span>
                                    <ul>
                                        <li>What is it?</li>
                                        <li>How to implement it?</li>
                                        <li>How should it be used?</li>
                                    </ul>
                                    <img src="FluxArchitectureImage.png" />
                                </WorkExample>
                                <WorkExample />
                                <WorkExample />
                                <WorkExample />
                                <WorkExample />
                            </div>;
                        }
                    }
                ]}
            />
            <div className='footer'>
                <span className='col'>All Rights Reserved &#169;</span>
                <Divider />
                <address className='col'>
                    <a className='email' href={`mailto:${EMAIL}`}>{EMAIL} (Preferred)</a>
                </address>
            </div>
        </div>;
    }
}
