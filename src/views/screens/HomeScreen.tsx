
import React from 'react';
import '@Styles/screens/HomeScreen';
import {HomeScreenLogic} from '@Logic/screens/HomeScreenLogic';
import {SlideShow} from '@Views/components/SlideShow';
import {Footer} from '@Views/components/Footer';
import {Header} from '@Views/components/Header';
import {WorkExample} from '@Views/components/WorkExample';
import {AboutMe} from '@Views/components/AboutMe';
import {WorkExperience} from '@Views/components/WorkExperience';
import {ScreenURL} from '@Logic/utility/ScreenURL';
import {IHomeScreen, IHomeScreenState} from '@Interfaces/screens/IHomeScreen';

export class HomeScreen extends React.Component<{}, IHomeScreenState> implements IHomeScreen {
    private $logic: HomeScreenLogic;

    constructor(props: {}) {
        super(props);
        this.$logic = new HomeScreenLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            <Header
                items={[
                    {
                        text: 'About Me',
                        isActive: this.state.index === 0,
                        onClick: () => {
                            this.$logic.setState({
                                index: 0
                            });
                        }
                    },
                    {
                        text: 'Work Experience',
                        isActive: this.state.index === 1,
                        onClick: () => {
                            this.$logic.setState({
                                index: 1
                            });
                        }
                    },
                    {
                        text: 'Work Examples',
                        isActive: this.state.index === 2,
                        onClick: () => {
                            this.$logic.setState({
                                index: 2
                            });
                        }
                    }
                ]}
            />
            <SlideShow
                className='body'
                index={this.state.index}
                items={[
                    {
                        render: () => {
                            return <AboutMe key='AboutMe' className='slideshow-content' />;
                        }
                    },
                    {
                        render: () => {
                            return <WorkExperience key="WorkExperience" className="slideshow-content" />;
                        }
                    },
                    {
                        render: () => {
                            return <div className='slideshow-content examples' key='examples'>
                                <WorkExample
                                    title='Flux Architecture'
                                    url={ScreenURL.FLUX_ARCHITECTURE}
                                >
                                    <span>Lesson on Flux Architecture</span>
                                    <ul>
                                        <li>What is it?</li>
                                        <li>How to implement it?</li>
                                        <li>How should it be used?</li>
                                    </ul>
                                    <img src="FluxArchitectureImage.png" />
                                </WorkExample>
                            </div>;
                        }
                    }
                ]}
            />
            <Footer />
        </div>;
    }
}
