

import '@Styles/components/WorkExperience.less';

import {IWorkExperienceProps} from '@Interfaces/components/IWorkExperience';

import {ComponentLogic} from '@Logic/ComponentLogic';

export function WorkExperience(props: IWorkExperienceProps) {
    return <div className={ComponentLogic.getClassName(['WorkExperience'], props.className)}>
        <span className='row header'>Experience Summary</span>
        <div className='row'>
            <div>
                <span>My work experience is focused on:</span>
                <ul>
                    <li>React JSX</li>
                    <li>TypeScript (both frontend and backend)</li>
                    <li>Cordova</li>
                    <li>Less</li>
                    <li>SQLite & MySQL</li>
                    <li>HTML/CSS/JavaScript</li>
                    <li>OOP Design</li>
                </ul>
                <span>I&apos;ve worked with the following environments:</span>
                <ul>
                    <li>Desktop Frontend</li>
                    <li>Mobile Device Frontend</li>
                    <li>Backend</li>
                    <li>Database</li>
                    <li>Cordova Native Plugins</li>
                    <li>C++</li>
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
            <span className='label'>Full Stack Software Developer</span><br />
            <span>May 2018 - May 2026</span><br />
            <span>TotalPave</span><br />
            <span>Fredericton, NB</span><br />
            <div>
                <ul>
                    <li><b>Worked</b> with React, Typescript, Cordova, Less, SQLite, Jest, and MySQL to build and maintain a suite of iOS and Android apps, Customer Web Portal, and Server-Side codebase.</li>
                    <li><b>Utilized</b> mobile Camera, Accelerometer, Location, and Google maps for the mobile applications.</li>
                    <li><b>Collaborated</b> with peers to design, review, and maintain GIS software within the OOP paradigm.</li>
                    <li><b>Contributed</b>     significantly to TotalPave’s transition from startup to established commercial product, including but not limited to:</li>
                    <li>
                        <ul>
                            <li><b>Introducing</b> offline support so that applications can be used effectively without a data connection with deferred data syncing capabilities.</li>
                            <li><b>Implementing</b> tools for road asset condition management according to the PDRM 2013 specification and MTO provisions, SP-021, SP-023, SP-024, SP-025, and SP-026.</li>
                            <li><b>Collaborated</b> with coworkers in the design and implementation of data to image software and a quad tree system used to power a tile map.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div className='row'>
            <span className='label'>Web Developer</span><br />
            <span>Summer 2016 & 2017</span><br />
            <span>Neil Squire Society</span><br />
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
        <span className='row header'>Education</span>
        <div className='row'>
            <span className='label'>Web and Mobile Application Development Diploma</span><br />
            <span>September 2016 - June 2018</span><br />
            <span>NBCC Moncton</span><br />
            <span>Moncton, NB</span><br />
            <div>
                <ul>
                    <li><b>Studied</b> the art of properly <b>planning</b>, <b>creating</b>, and <b>delivering</b> Information Technology Projects.</li>
                    <li><b>Worked</b> with HTML, CSS, JavaScript, ASP.Net, Transact-SQL, React JS, Java EE, JSF, JSP, PHP, MySQL, Android and Swift.</li>
                    <li><b>Used</b> N-Tier Methodology, MVC Architecture, Factory Pattern, and Test-Driven Development.</li>
                </ul>
            </div>
        </div>
    </div>;
}
