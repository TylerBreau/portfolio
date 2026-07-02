

import '@Styles/components/WorkExperience.less';

import {IWorkExperienceProps} from '@Interfaces/components/IWorkExperience';

import {ComponentLogic} from '@Logic/ComponentLogic';

export function WorkExperience(props: IWorkExperienceProps) {
    return <div className={ComponentLogic.getClassName(['WorkExperience'], props.className)}>
        <span className='row header'>Experience Summary</span>
        <div className='row'>
            <span className='label'>Frontend</span>
            <ul>
                <li>React (TypeScript, JSX)</li>
                <li>HTML, CSS, & JavaScript</li>
                <li>LESS</li>
                <li>Cordova</li>
                <li>Google Maps (JavaScript & Cordova Google Maps plugin)</li>
                <li>Cordova plugin development (native Android & iOS)</li>
                <li>In-house C++ data-to-image rendering software (Integrated via Cordova plugins)</li>
                <li>D3.js Library</li>
            </ul>
            <span className='label'>Backend & Data</span>
            <ul>
                <li>Node.js (TypeScript)</li>
                <li>MySQL & SQLite</li>
                <li>RESTful APIs</li>
                <li>PHP & PHP Mailer</li>
                <li>TCPDF Library</li>
            </ul>
            <span className='label'>Systems & Architecture</span>
            <ul>
                <li>Offline-first architecture</li>
                <li>Layered Architecture</li>
                <li>OOP Design</li>
            </ul>
            <span className='label'>Tools</span>
            <ul>
                <li>Git & GitHub</li>
                <li>Jira</li>
                <li>Confluence</li>
                <li>Android Studio & Xcode</li>
                <li>VirtualBox & Parallels</li>
            </ul>
        </div>
        <span className='row header'>Employment History</span>
        <div className='row'>
            <span className='label'>Full Stack Software Developer</span><br />
            <span>May 2018 - May 2026</span><br />
            <span>TotalPave</span><br />
            <span>Fredericton, NB | Remote since 2020</span><br />
            <div>
                <ul>
                    <li><b>Worked</b> with React, TypeScript, GitHub, Cordova, LESS, SQLite, Jest, and MySQL to build and maintain a suite of iOS and Android apps, a Customer Web Portal, and a Server-Side codebase.</li>
                    <li><b>Generated</b> charts for a Reports Dashboard using the D3 library.</li>
                    <li><b>Utilized</b> mobile Camera, Accelerometer, Location, and Google Maps for the mobile applications.</li>
                    <li><b>Collaborated</b> with peers to design, review, and maintain GIS software within the OOP paradigm.</li>
                    <li><b>Contributed</b> significantly to TotalPave&apos;s transition from startup to established commercial product, including but not limited to:</li>
                    <li style={{listStyle: 'none'}}>
                        <ul>
                            <li><b>Built</b> Offline-first architecture so that applications can be used effectively without a data connection with deferred data syncing capabilities. This system included bidirectional synchronization, hierarchical dataset merging, data conflict resolution, data model constraints, and a NTP solution to ensure last modified timestamps were accurate.</li>
                            <li><b>Designing</b> and <b>implementing</b> support for a new standard of road condition surveys according to the PDRM 2013 specification and MTO provisions, SP-021, SP-023, SP-024, SP-025, and SP-026.</li>
                            <li><b>Collaborated</b> with coworkers in the design and implementation of C++ data to image software and a quad tree system used to power a tile map.</li>
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
                    <li><b>Worked</b> with HTML, CSS, JavaScript, PHP, and MySQL to build a website on an Apache server with MariaDB. I also used the PuTTY, HeidiSQL, PHPMyAdmin, and WinSCP tools while building the website.</li>
                    <li><b>Supported</b> assistive technology and browsers as old as IE 9 throughout the website.</li>
                    <li><b>Implemented</b> automated emails with PHP Mailer.</li>
                    <li><b>Generated</b> downloadable PDFs with the TCPDF Library.</li>
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
                    <li><b>Focused</b> on <b>planning</b>, <b>creating</b>, and <b>delivering</b> Information Technology Projects.</li>
                    <li><b>Worked</b> with HTML, CSS, JavaScript, ASP.NET, Transact-SQL, React, Java EE, JSF, JSP, PHP, MySQL, Android and Swift.</li>
                    <li><b>Used</b> N-Tier Methodology, MVC Architecture, Factory Pattern, and Test-Driven Development.</li>
                </ul>
            </div>
        </div>
    </div>;
}
