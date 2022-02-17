
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {
    ISlideShowItem,
    ISlideShowTitleItem,
    ISlideShowProps,
    ISlideShowState
} from '@Interfaces/components/ISlideShow';

export class SlideShowLogic extends ComponentLogic<ISlideShowState, ISlideShowProps> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('SlideShow');

        this.onNavigateClick = this.onNavigateClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    _initState(state: Partial<ISlideShowState>) {
        state.index = 0;
    }

    getTitles(): Array<ISlideShowTitleItem> {
        return this.getProps().items.map((value: ISlideShowItem, index: number) => {
            return {
                title: value.title,
                index: index
            };
        });
    }

    getActiveSlide(): ISlideShowItem {
        return this.getProps().items[this.getState().index];
    }

    onNavigateClick(index: number): never | void {
        if (index < 0 || index > (this.getProps().items.length - 1)) {
            throw new Error('Index is out of range.');
        }
        this.setState({
            index: index
        });
    }

    onNextClick() {
        let newIndex: number = ++this.getState().index;

        if (newIndex > (this.getProps().items.length - 1)) {
            newIndex = 0;
        }

        this.onNavigateClick(newIndex);
    }

    onPreviousClick() {
        let newIndex: number = --this.getState().index;

        if (newIndex < 0) {
            newIndex = this.getProps().items.length - 1;
        }

        this.onNavigateClick(newIndex);
    }
}
