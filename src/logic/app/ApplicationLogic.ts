
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import * as ReactRouterDOM from 'react-router-dom';

let APPLICATION: ApplicationLogic;

export class ApplicationLogic extends ComponentLogic {
    private navigator: ReactRouterDOM.NavigateFunction;

    constructor(node: React.Component) {
        super(node);
        this._addClassName('Application');

        if (APPLICATION) {
            throw new Error('Can not instantiate 2 instances of Application.');
        }
        else {
            APPLICATION = this;
        }

        this.navigator = ReactRouterDOM.useNavigate();
    }

    static getInstance(): ApplicationLogic {
        return APPLICATION;
    }

    public navigate(url: string, options: ReactRouterDOM.NavigateOptions) {
        this.navigator(url, options);
    }

    public back(): void {
        this.navigator(-1);
    }
}
