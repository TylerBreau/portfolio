
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {
    ISlideShowItem,
    ISlideShowProps
} from '@Interfaces/components/ISlideShow';

export class SlideShowLogic extends ComponentLogic<never, ISlideShowProps> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('SlideShow');
    }

    getActiveSlide(): ISlideShowItem {
        return this.getProps().items[this.getProps().index];
    }
}
