
import {useState} from 'react';

import '@Styles/screens/HomeScreen.less';

import {ScreenLogic} from '@Logic/ScreenLogic';
import {HomeScreenLogic} from '@Logic/HomeScreenLogic';

import {SlideShow} from '@Views/components/SlideShow';
import {Footer} from '@Views/components/Footer';
import {AboutMe} from '@Views/components/AboutMe';
import {WorkExperience} from '@Views/components/WorkExperience';
import {PortfolioHeader} from '@Views/components/PortfolioHeader';
import {FluxArchitectureWorkExample} from '@Views/workExamples/FluxArchitectureWorkExample';
import {WorkExamples} from '@Views/components/WorkExamples';

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
                return <WorkExamples
                    key='WorkExamples'
                    className='slideshow-content'
                    onClick={(index: WorkExampleIndex) => {
                        setHeaderIndex(PortfolioHeaderIndex.WORK_EXAMPLE);
                        setWorkExampleIndex(index);
                    }}
                />;
            }
        },
        {
            render: () => {
                switch (workExampleIndex) {
                    case WorkExampleIndex.FLUX_ARCHITECURE: return <FluxArchitectureWorkExample className='slideshow-content' />;
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
