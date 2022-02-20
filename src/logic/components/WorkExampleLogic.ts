
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {IWorkExampleProps} from '@Interfaces/components/IWorkExample';

export class WorkExampleLogic extends ComponentLogic<IWorkExampleProps, never> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('WorkExample');
    }
}
