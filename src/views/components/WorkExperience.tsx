

import React from 'react';
import '@Styles/components/WorkExperience';
import { IComponentProps } from '@Interfaces/IComponentProps';

export class WorkExperience extends React.Component<IComponentProps> {
    render() {
        return <div className={'WorkExperience' + (this.props.className ? ' ' + this.props.className : '')}>
            <span className='row header'>Experience Summary</span>
            <div className='row'>
                <div>
                    <span>My work experience is focused on:</span>
                    <ul>
                        <li>React JSX</li>
                        <li>Cordova</li>
                        <li>TypeScript (both frontend and backend)</li>
                        <li>MySQL</li>
                        <li>SQLite</li>
                        <li>HTML/CSS/JavaScript</li>
                        <li>Less</li>
                        <li>Flux Architecture</li>
                        <li>OOP Design</li>
                    </ul>
                    <span>I also have work experience in:</span>
                    <ul>
                        <li>PHP</li>
                        <li>PHP Mailer</li>
                        <li>TCPDF Library</li>
                        <li>D3 (Data-Driven Documents) Library</li>
                        <li>Cordova Plugin Development (Native Android and iOS)</li>
                        <li>C++ Library Development</li>
                    </ul>
                </div>
            </div>
            <span className='row header'>Employment History</span>
            <div className='row'>
                <span className='label'>TotalPave, Web and Mobile Full-Stack Developer</span><br />
                <span>May 22, 2018-Present</span><br />
                <span>Fredericton, NB</span><br />
                <div>
                    <ul>
                        <li><b>Worked</b> with React, Cordova, TypeScript (frontend and backend), Less, MySQL, SQLite, Android, and Objective-C to build and maintain the company&apos;s websites, mobile apps, and backend systems.</li>
                        <li><b>Used</b> the Smart Phone features, Accelerometer, Geolocation, Camera, SQLite, and GoogleMaps APIs for iOS 9+ and Android 4.1+.</li>
                        <li><b>Generated</b> and <b>provided</b> charts and graphs using D3 (Data Driven Documents) library.</li>
                        <li><b>Designed</b> mobile apps and websites using Flux Architecture and OOP design patterns.</li>
                        <li><b>Wrote</b> C++ libraries to abstract re-usable codebases between Android and iOS.</li>
                    </ul>
                </div>
            </div>
            <div className='row'>
                <span className='label'>Neil Squire Society, Web and Mobile Developer</span><br />
                <span>Summer 2016-2017</span><br />
                <span>Moncton, NB</span><br />
                <div>
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
}
