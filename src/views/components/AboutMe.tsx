
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
                    <span className='label'>Backstory:</span>
                    <p className='value'>
                        My first experience programming was through a highschool Java class. During that school year, I remade the periodic table of elements in a Java program; it was an interesting project though it wasn't pretty.
                        <br /><br />
                        After highschool, I planned to start a career around programming. I had first thought about going into game development but decided against it as I learned there was few local job opportunities; instead I went into web and mobile development and enrolled into NBCC Moncton.
                        <br />
                        Luckily for me, I had the fortune to be introduced to Neil Squire Society. Neil Squire Society hired me for summers of 2016 and 2017 to program a website that would host a digital survey for them. It was an interesting experience as my college was a 2 year course from 2017 to 2018, Neil Squire Society was intentionally looking for a high school graduate that was going into programming to tackle the project, a way to help out and provide opportunities. 
                        <br />
                        The manager helped get started with PHP and a simple development environment but I was expected to handle the majority of self-learning while still meeting the deadlines for the project. 
                        <br /><br />
                        It was a great opportunity to continue exploring programming while using the pay to fund my college tuition and other expenses. As expected, without proper education, the website was functional and looked fine but was not coded that well. I believe it was sufficiently within expectations but now that I've graduated from NBCC and gained some years of work experience, I can confidently say I would have done just about everything differently. The website would look very similar, just would have built better.
                        <br /><br />
                        My time at NBCC was colorful... It was refreshing, frustrating, and informative. While there were times I didn't like, it was a good experience and help me grow as a person.
                        <br />
                        NBCC's web and mobile course covered a wide range of topics, including a variety of languages: C#, Java, Objective C, HTML, CSS, JavaScript, and MySQL. We also explored several frameworks and environments: ASP.net, Java Spring, JSP, iOS, and Android.
                        <br />
                        Additionally, the course touched on software architecture and class projects to explore more frameworks.
                        <br />
                        For software architecture, we were taught about organizing code into layers: interfaces, database, business, UI, etc. The organizing played multiple roles but one of the largest benefits to this lesson was to solve circular dependency problems. Each layer would need depend on other layers, creating a situation where Layer A and Layer B would depend on each other. The interfaces layer was used to solve this problem, it was a layer that everything depended on and the interfaces layer did not depend on any layer.
                        <br />
                        The class project was focused on web frameworks and libraries, a fitting topic for a web and mobile course. I ended choosing React, a framework whose focus is making the creation of UI more seamless. Creating complex UI can be a lot of work. You have to manage the state, UI interactions, and control how the UI reacts and updates to state changes. Having worked with React for some years after college, I find it is a great library to simplify the entire process.
                        <br /><br />
                        With the help of my brother who was a developer, I did my OJT at TotalPave and continued working at TotalPave after graduating. My brother was the lead developer and my mentor, with his help I've grown significantly as a developer. There's a lot that I've learned and improved at, such as programming languages, problem solving skills, task tracking/management software, design patterns, and developing a strong intuition for tackling coding tasks and fixing bugs.
                    </p>
                </div>
            </div>
            <img className='col' height='200px' width='300px' />
        </div>;
    }
}
