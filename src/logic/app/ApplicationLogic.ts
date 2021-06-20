
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';

export class ApplicationLogic extends ComponentLogic {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('Application');
    }
}
