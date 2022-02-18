
import React from 'react';
import '@Styles/components/SlideShow';
import {SlideShowLogic} from '@Logic/components/SlideShowLogic';
import {
    ISlideShow,
    ISlideShowProps
} from '@Interfaces/components/ISlideShow';

export class SlideShow extends React.Component<ISlideShowProps> implements ISlideShow {
    private $logic: SlideShowLogic;

    constructor(props: ISlideShowProps) {
        super(props);
        this.$logic = new SlideShowLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            {this.$logic.getActiveSlide().render()}
        </div>;
    }
}
