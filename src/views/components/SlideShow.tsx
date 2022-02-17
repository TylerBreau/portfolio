
import React from 'react';
import '@Styles/components/SlideShow';
import {SlideShowLogic} from '@Logic/components/SlideShowLogic';
import {
    ISlideShow,
    ISlideShowTitleItem,
    ISlideShowProps,
    ISlideShowState
} from '@Interfaces/components/ISlideShow';
import {Divider} from '@Views/components/Divider';

export class SlideShow extends React.Component<ISlideShowProps, ISlideShowState> implements ISlideShow {
    private $logic: SlideShowLogic;

    constructor(props: ISlideShowProps) {
        super(props);
        this.$logic = new SlideShowLogic(this);
    }

    _createTitle(titleData: ISlideShowTitleItem) {
        let className = 'header-item';
        if (titleData.index === this.$logic.getState().index) {
            className += ' active';
        }
        return <span
            className={className}
            key={titleData.index}
            onClick={() => {
                this.$logic.onNavigateClick(titleData.index);
            }}
        >
            {titleData.title}
        </span>;
    }

    render() {
        const titlesUI = [];
        for (let i = 0, titles = this.$logic.getTitles(), length = titles.length; i < length; ++i) {
            titlesUI.push(this._createTitle(titles[i]));
            if (i + 1 < length) {
                titlesUI.push(<Divider key={i + 1 + '-divider'} />);
            }
        }
        return <div className={this.$logic.getClassName()}>
            <div className='header'>
                {titlesUI}
            </div>
            <div className='content'>
                {this.$logic.getActiveSlide().render()}
            </div>
        </div>;
    }
}
