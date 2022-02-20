
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {IComponentProps} from '@Interfaces/IComponentProps';

export class ScreenLogic<IState = never, IProps extends IComponentProps = never> extends ComponentLogic<IState, IProps> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('Screen');
    }
}
