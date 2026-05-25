
import '@Styles/components/AboutMe.less';
import {IAboutMeProps} from '@Interfaces/components/IAboutMe';
import {ComponentLogic} from '@Logic/ComponentLogic';

export function AboutMe(props: IAboutMeProps) {
    return <div className={ComponentLogic.getClassName(['AboutMe'], props.className)}>
        <div className='content'>
            <div className='row name-row'>
                <span className='label'>Name:</span>
                <span className='value'>Tyler Breau</span>
                <img height='300px' width='300px' src='ProfileImage.jpg' />
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
                <span className='label'>Education & Experience:</span>
                <span className='value'>
                    2018 Grad of NBCC Moncton, Web and Mobile Application Development Program
                    <br />
                    Full-time Full-Stack Developer June 2018 to May 2026.
                </span>
            </div>
            <div className='row'>
                <span className='label'>Backstory:</span>
                <p className='value'>
                    My first experience programming was through a high school Java class. During that school year, I remade the periodic table of elements in a Java program; it was an interesting project though it wasn&apos;t pretty.
                    <br /><br />
                    After high school, I planned to start a career in programming. I had first thought about going into game development but decided against it as I learned there were few local job opportunities; instead I went into web and mobile development and enrolled into NBCC Moncton.
                    <br />
                    Luckily for me, I had the fortune to be introduced to Neil Squire Society. Neil Squire Society hired me for summers of 2016 and 2017 to program a website that would host a digital survey for them. It was an interesting experience as my college was a two year course from 2017 to 2018, Neil Squire Society was intentionally looking for a high school graduate that was going into programming to tackle the project, a way to help out and provide opportunities. 
                    <br />
                    The manager helped get started with PHP and a simple development environment but I was expected to teach myself while still meeting the deadlines for the project. 
                    <br /><br />
                    It was a great opportunity to continue exploring programming while using the pay to fund my college tuition and other expenses. As expected, without proper education, the website was functional and looked fine but was not coded that well. I feel confident that I performed within expectations but after I had graduated from NBCC and gained some years of work experience, I could confidently say I would have done just about everything differently. The website would look very similar, just would have been built better.
                    <br /><br />
                    My time at NBCC was colorful... It was refreshing, frustrating, and informative. While there were times I didn&apos;t like, it was a good experience and help me grow.
                    <br />
                    NBCC&apos;s web and mobile course covered a wide range of topics, including a variety of languages: C#, Java, Objective C, HTML, CSS, JavaScript, and MySQL. We also explored several frameworks and environments: ASP.NET, Java Spring, JSP, iOS, and Android.
                    <br />
                    Additionally, the course touched on software architecture and class projects to explore more frameworks.
                    <br />
                    We were taught about organizing code into layers: interfaces, database, business, UI, etc. These lessons about organization played multiple roles but one of the largest benefits was to solve circular dependency problems. Each layer would need depend on other layers, creating a situation where Layer A and Layer B would depend on each other. The interfaces layer was used to solve this problem, it was a layer that everything depended on and the interfaces layer did not depend on any layer.
                    <br />
                    The class projects was focused on web frameworks and libraries, a fitting topic for a web and mobile course. I ended up choosing React, a framework whose focus is making the creation of UI more seamless. Creating complex UI can be a lot of work. You have to manage the state, UI interactions, and control how the UI reacts and updates to state changes. Having worked with React for years after college, I find it is a great library to simplify the entire process.
                    <br /><br />
                    With the help of my brother who was a developer, I did my OJT at TotalPave and continued working at TotalPave after graduating. During the eight years I worked at TotalPave, I helped it break out of the startup phase, assisting in developing major features. My biggest project at TotalPave was setting up full offline support for their data collection apps, a feature I started on early in my career and made several iterations on over the years. This feature was particularly important to TotalPave as the data their apps collected was visual and physical surveys of roads. Depending on where the roads were internet connection was not always reliable, so it was vital for the apps to be fully functional without internet.
                    My brother was the lead developer and my mentor, with his help I&apos;ve grown significantly as a developer. During my time at TotalPave I&apos;ve progressed my experience from Junior to Senior developer, honing my ability to solve problems, utilizing design patterns, designing software, and developing a strong intuition for tackling coding tasks and fixing bugs.
                </p>
            </div>
        </div>
    </div>;
}
