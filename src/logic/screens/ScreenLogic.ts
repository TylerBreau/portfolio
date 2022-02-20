
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {IComponent} from '@Interfaces/IComponent';

export class ScreenLogic<IState = never, IProps extends IComponent = never> extends ComponentLogic<IState, IProps> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('Screen');
    }
}
