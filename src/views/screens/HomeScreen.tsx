
import {useState} from 'react';
import '@Styles/screens/HomeScreen.less';
import {ScreenLogic} from '@Logic/ScreenLogic';
import {SlideShow} from '@Views/components/SlideShow';
import {Footer} from '@Views/components/Footer';
import {Header} from '@Views/components/Header';
import {WorkExampleTile} from '@Views/components/WorkExampleTile';
import {AboutMe} from '@Views/components/AboutMe';
import {WorkExperience} from '@Views/components/WorkExperience';
import {ScreenURL} from '@Interfaces/ScreenURL';

export function HomeScreen() {
    const [index, setIndex] = useState(0);

    return <div className={ScreenLogic.getClassName(['HomeScreen'])}>
        <Header
            items={[
                {
                    text: 'About Me',
                    isActive: index === 0,
                    onClick: () => {
                        setIndex(0);
                    }
                },
                {
                    text: 'Work Experience',
                    isActive: index === 1,
                    onClick: () => {
                        setIndex(1);
                    }
                },
                {
                    text: 'Work Examples',
                    isActive: index === 2,
                    onClick: () => {
                        setIndex(2);
                    }
                }
            ]}
        />
        <SlideShow
            index={index}
            items={[
                {
                    render: () => {
                        return <AboutMe key='AboutMe' className='slideshow-content' />;
                    }
                },
                {
                    render: () => {
                        return <WorkExperience key='WorkExperience' className='slideshow-content' />;
                    }
                },
                {
                    render: () => {
                        return <div className='slideshow-content examples' key='examples'>
                            <WorkExampleTile
                                title='Flux Architecture'
                                url={ScreenURL.FLUX_ARCHITECTURE}
                            >
                                <span>Lesson on Flux Architecture</span>
                                <ul>
                                    <li>What is it?</li>
                                    <li>How to implement it?</li>
                                    <li>How should it be used?</li>
                                </ul>
                                <img src='FluxArchitectureImage.png' />
                            </WorkExampleTile>
                        </div>;
                    }
                }
            ]}
        />
        <Footer />
    </div>;
}
