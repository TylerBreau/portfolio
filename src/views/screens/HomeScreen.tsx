
import {useState} from 'react';
import '@Styles/screens/HomeScreen.less';
import {ScreenLogic} from '@Logic/ScreenLogic';
import {SlideShow} from '@Views/components/SlideShow';
import {Footer} from '@Views/components/Footer';
import {WorkExampleTile} from '@Views/components/WorkExampleTile';
import {AboutMe} from '@Views/components/AboutMe';
import {WorkExperience} from '@Views/components/WorkExperience';
import {ScreenURL} from '@Interfaces/ScreenURL';
import {PortfolioHeader} from '@Views/components/PortfolioHeader';
import {PortfolioHeaderIndex} from '@Interfaces/components/IPortfolioHeader';

export function HomeScreen() {
    let [headerIndex, setHeaderIndex] = useState<PortfolioHeaderIndex>(PortfolioHeaderIndex.ABOUT_ME);
    
    return <div className={ScreenLogic.getClassName(['HomeScreen'])}>
        <PortfolioHeader
            index={headerIndex}
            onIndexChange={(index: PortfolioHeaderIndex) => setHeaderIndex(index)}
        />
        <SlideShow
            index={headerIndex}
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
