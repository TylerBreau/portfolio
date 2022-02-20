
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {
    IAboutMeProps
} from '@Interfaces/components/IAboutMe';

export class AboutMeLogic extends ComponentLogic<IAboutMeProps> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('AboutMe');
    }
}
