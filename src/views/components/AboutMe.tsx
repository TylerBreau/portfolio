
import '@Styles/components/AboutMe.less';

import {IAboutMeProps} from '@Interfaces/components/IAboutMe';

import {ComponentLogic} from '@Logic/ComponentLogic';

export function AboutMe(props: IAboutMeProps) {
    return <div className={ComponentLogic.getClassName(['AboutMe'], props.className)}>
        <p>
            <img src='ProfileImage.jpg' />
            <b>Name & Occupation:</b>
            <br />
            Tyler Breau, Full Stack Software Developer
            <br /><br />
            <b>Backstory:</b>
            <br />
            My first experience programming was through a high school Java class. During that school year, I remade the periodic table of elements in a Java program; it was an interesting project though it wasn&apos;t pretty.
            <br /><br />
            After high school, I planned to start a career in programming. I had first thought about going into game development but decided against it as I learned there were few local job opportunities; instead I went into web and mobile development and enrolled into NBCC Moncton.
            <br /><br />
            Luckily for me, I was hired by Neil Squire Society for the summers of 2016 and 2017 to build a website that hosted a digital survey. It was an interesting experience, as these summers were before my first and second years of college. Neil Squire Society was specifically looking for a high school graduate who was going into programming to tackle the project, as a way to help out and provide opportunities. 
            <br />
            The manager helped me get started with PHP and a simple development environment but I was expected to teach myself while still meeting the deadlines for the project. It was a great opportunity to continue exploring programming while using the pay to fund my college tuition and other expenses.
            <br />
            While I am confident that I performed within expectations and that the website was functional and looked fine, unsurprisingly given my experience at the time, it was not coded that well. After graduating from NBCC and working for a few years, I could confidently say I would have done just about everything differently. The website would look very similar, just would have been built better.
            <br /><br />
            My time at NBCC was colorful - refreshing, frustrating, and informative. While there were times I didn&apos;t enjoy, it was a good experience that helped me grow.
            <br />
            The Web and Mobile Application Development program covered a wide range of technologies, including C#, Java, Objective C, HTML, CSS, JavaScript, and MySQL. We also explored several frameworks and environments such as ASP.NET, Java Spring, JSP, iOS, and Android. Beyond specific technologies, the program also introduced broader software design concepts and architecture principles.
            <br />
            One of the most impactful concepts for me was layered architecture, separating concerns between UI, business logic, and data access. In particular, using an interfaces layer to avoid tight coupling and circular dependencies.
            <br />
            One of the memorable class projects was picking a web framework to learn and present to my classmates. I chose React and got a head start by learning from my brother, who was also a software developer using React. At the time, it was a powerful introduction to building dynamic UI and it has remained a core part of my development work for many years after graduating. 
            <br /><br />
            Part of the college course was securing an OJT. With my brother vouching for me, I secured my OJT at TotalPave where I built a Cordova application that is still sold today, the TotalPave Tracker app. It was a simple application, drop a pin on an embedded Google Maps, take a picture, and input a title & description.
            <br />
            The main purpose of this app was to serve as a low-risk task for an intern while still generating value for the company, and to act as a prototype for a planned major feature: full offline support for their mobile applications.
            <br />
            My brother, the lead developer, designed the offline system, while I was responsible for implementing it.
            <br /><br />
            The main challenge with offline support was a bidirectional synchronization problem. TotalPave&apos;s applications are data collection tools used by field workers. Local devices would often contain data not yet present on the server, while the server would also contain updates not yet synchronized to the devices.
            <br />
            As part of this task, I handled multiple sources of truth, resynchronizing two databases, and maintaining data integrity while doing so. 
            <br /><br />
            After my OJT, I was hired full time at TotalPave, where I refactored one of their existing applications, TotalPave PCI, to introduce full offline support. This application supported visual road condition surveys performed according to industry standards.
            <br />
            The PCI app was a critical piece of software and one of TotalPave&apos;s primary revenue generating systems. This app faced the same overall problem as the Tracker application, with only a few notable differences. Unlike the Tracker application, PCI also displayed the client&apos;s road network — the collection of roads they are responsible for maintaining. In addition, the survey data it handled was significantly more complex.
            <br />
            <br />
            Following PCI, I performed similar refactors for the IRI application, another primary revenue generating system and data collection tool used for instrumented road condition surveys performed according to a different industry standard.
            <br />
            Over the following years, I worked alongside my brother to maintain and develop TotalPave&apos;s ecosystem, including its customer web portal, backend services, and mobile applications (PCI, IRI, and Tracker). During this time, I progressed my career from college graduate to senior developer.
        </p>
    </div>;
}
