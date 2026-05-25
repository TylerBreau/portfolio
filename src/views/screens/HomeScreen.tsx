
import {useState} from 'react';

import '@Styles/screens/HomeScreen.less';

import {ScreenLogic} from '@Logic/ScreenLogic';
import {HomeScreenLogic} from '@Logic/HomeScreenLogic';

import {SlideShow} from '@Views/components/SlideShow';
import {Footer} from '@Views/components/Footer';
import {WorkExampleTile} from '@Views/components/WorkExampleTile';
import {AboutMe} from '@Views/components/AboutMe';
import {WorkExperience} from '@Views/components/WorkExperience';
import {PortfolioHeader} from '@Views/components/PortfolioHeader';
import {FluxArchitectureWorkExample} from '@Views/workExamples/FluxArchitectureWorkExample';

import {PortfolioHeaderIndex} from '@Interfaces/components/IPortfolioHeader';
import {WorkExampleIndex} from '@Interfaces/components/IWorkExampleTile';
import {ISlideShowItem} from '@Interfaces/components/ISlideShow';

export function HomeScreen() {
    let [headerIndex, setHeaderIndex] = useState<PortfolioHeaderIndex>(PortfolioHeaderIndex.ABOUT_ME);
    let [workExampleIndex, setWorkExampleIndex] = useState<WorkExampleIndex | null>(null);

    let slideShowItems: ISlideShowItem[] = [
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
                        onClick={() => {
                            setHeaderIndex(PortfolioHeaderIndex.WORK_EXAMPLE);
                            setWorkExampleIndex(WorkExampleIndex.FLUX_ARCHITECURE);
                        }}
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
        },
        {
            render: () => {
                switch (workExampleIndex) {
                    case WorkExampleIndex.FLUX_ARCHITECURE: return <FluxArchitectureWorkExample />;
                    default: return null;
                }
            }
        }
    ];

    return <div className={ScreenLogic.getClassName(['HomeScreen'])}>
        <PortfolioHeader
            index={headerIndex}
            onIndexChange={(index: PortfolioHeaderIndex) => {
                setHeaderIndex(index);
                if (index !== PortfolioHeaderIndex.WORK_EXAMPLE) {
                    setWorkExampleIndex(null);
                }
            }}
            subscreen={HomeScreenLogic.getSubscreenHeaderItem(workExampleIndex)}
        />
        <SlideShow
            index={headerIndex}
            items={slideShowItems}
        />
        <Footer />
    </div>;
}
