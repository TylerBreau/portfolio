
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {ApplicationLogic} from '@Logic/app/ApplicationLogic';
import {ScreenURL} from '@Logic/utility/ScreenURL';

export interface IWorkExampleProps {
    title: String;
    children: Node;
    url: String;
}

export class WorkExampleLogic extends ComponentLogic<never, IWorkExampleProps> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('WorkExample');

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        ApplicationLogic.getInstance().navigate(ScreenURL.FLUX_ARCHITECTURE, {replace: true});
    }
}
