
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {IComponentProps} from '@Interfaces/IComponentProps';

export class ScreenLogic<IProps extends IComponentProps = never, IState = never> extends ComponentLogic<IProps, IState> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('Screen');
    }
}
