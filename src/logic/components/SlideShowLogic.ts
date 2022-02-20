
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {ISlideShowProps} from '@Interfaces/components/ISlideShow';

export class SlideShowLogic extends ComponentLogic<ISlideShowProps, never> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('SlideShow');
    }

    getLeft(): string {
        return (this.getProps().index * -100) + '%';
    }
}
