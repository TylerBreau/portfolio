
import {useState} from 'react';

import '@Styles/screens/HomeScreen.less';

import {ScreenLogic} from '@Logic/ScreenLogic';
import {HomeScreenLogic} from '@Logic/HomeScreenLogic';

import {SlideShow} from '@Views/components/SlideShow';
import {Footer} from '@Views/components/Footer';
import {AboutMe} from '@Views/components/AboutMe';
import {WorkExperience} from '@Views/components/WorkExperience';
import {PortfolioHeader} from '@Views/components/PortfolioHeader';
import {FluxArchitectureTechnicalArticle} from '@Views/technicalArticles/FluxArchitectureTechnicalArticle';
import {TechnicalArticles} from '@Views/components/TechnicalArticles';
import {TechnicalAchievements} from '@Views/components/TechnicalAchievements';

import {PortfolioHeaderIndex} from '@Interfaces/components/IPortfolioHeader';
import {TechnicalArticleIndex} from '@Interfaces/components/ITechnicalArticleTile';
import {ISlideShowItem} from '@Interfaces/components/ISlideShow';

export function HomeScreen() {
    let [headerIndex, setHeaderIndex] = useState<PortfolioHeaderIndex>(PortfolioHeaderIndex.ABOUT_ME);
    let [technicalArticleIndex, setTechnicalArticleIndex] = useState<TechnicalArticleIndex | null>(null);

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
                return <TechnicalAchievements
                    key='TechnicalAchievements'
                    className='slideshow-content'
                    onClick={(index: TechnicalArticleIndex) => {
                        setHeaderIndex(PortfolioHeaderIndex.TECHNICAL_ACHIEVEMENTS);
                        setTechnicalArticleIndex(index);
                    }}
                />;
            }
        },
        {
            render: () => {
                return <TechnicalArticles
                    key='TechnicalArticles'
                    className='slideshow-content'
                    onClick={(index: TechnicalArticleIndex) => {
                        setHeaderIndex(PortfolioHeaderIndex.TECHNICAL_ARTICLE);
                        setTechnicalArticleIndex(index);
                    }}
                />;
            }
        },
        {
            render: () => {
                switch (technicalArticleIndex) {
                    case TechnicalArticleIndex.FLUX_ARCHITECURE: return <FluxArchitectureTechnicalArticle className='slideshow-content' />;
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
                if (index !== PortfolioHeaderIndex.TECHNICAL_ARTICLE) {
                    setTechnicalArticleIndex(null);
                }
            }}
            subscreen={HomeScreenLogic.getSubscreenHeaderItem(technicalArticleIndex)}
        />
        <SlideShow
            index={headerIndex}
            items={slideShowItems}
            shouldLimitHeight={false}
        />
        <Footer />
    </div>;
}
