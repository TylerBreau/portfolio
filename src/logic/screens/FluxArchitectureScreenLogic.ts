
import React from 'react';
import {ScreenLogic} from '@Logic/screens/ScreenLogic';

export class FluxArchitectureScreenLogic extends ScreenLogic {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('FluxArchitecture');
    }
}
